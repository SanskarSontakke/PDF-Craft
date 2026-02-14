/// <reference lib="webworker" />

import { PDFDocument } from 'pdf-lib';

// Define the shape of messages sent to the worker
type WorkerMessage =
    | { type: 'MERGE_PDFS'; payload: { files: ArrayBuffer[] } }
    | { type: 'SPLIT_PDF'; payload: { file: ArrayBuffer; ranges: { start: number; end: number }[] } }
    | { type: 'COMPRESS_PDF'; payload: { file: ArrayBuffer; quality?: number } };

// Define the shape of messages sent from the worker
type WorkerResponse =
    | { type: 'SUCCESS'; payload: ArrayBuffer | ArrayBuffer[] }
    | { type: 'ERROR'; error: string };

self.onmessage = async (e: MessageEvent<WorkerMessage>) => {
    try {
        const { type, payload } = e.data;

        switch (type) {
            case 'MERGE_PDFS':
                await handleMergePDFs(payload.files);
                break;
            case 'SPLIT_PDF':
                await handleSplitPDF(payload.file, payload.ranges);
                break;
            // Add other cases here as we implement them
            default:
                throw new Error(`Unknown message type: ${type}`);
        }
    } catch (error) {
        self.postMessage({
            type: 'ERROR',
            error: error instanceof Error ? error.message : 'Unknown worker error'
        });
    }
};

async function handleMergePDFs(files: ArrayBuffer[]) {
    try {
        const mergedPdf = await PDFDocument.create();

        for (const fileBuffer of files) {
            const pdf = await PDFDocument.load(fileBuffer);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach((page) => mergedPdf.addPage(page));
        }

        const savedPdfBytes = await mergedPdf.save();

        // Transfer buffer to avoid copying
        const buffer = savedPdfBytes.buffer.slice(0); // Ensure copy if needed, or just cast
        self.postMessage({ type: 'SUCCESS', payload: buffer }, [buffer]);
    } catch (error) {
        throw error;
    }
}

async function handleSplitPDF(file: ArrayBuffer, ranges: { start: number; end: number }[]) {
    try {
        const pdfDoc = await PDFDocument.load(file);
        const totalPages = pdfDoc.getPageCount();
        const resultBuffers: ArrayBuffer[] = [];

        for (const range of ranges) {
            // Validation: Ensure range is within bounds
            const start = Math.max(1, range.start);
            const end = Math.min(totalPages, range.end);

            if (start > end) continue;

            const newPdf = await PDFDocument.create();

            // Convert 1-based range to 0-based indices
            const indices: number[] = [];
            for (let i = start; i <= end; i++) {
                indices.push(i - 1);
            }

            const copiedPages = await newPdf.copyPages(pdfDoc, indices);
            copiedPages.forEach((page) => newPdf.addPage(page));

            const savedBytes = await newPdf.save();
            // Cast to ArrayBuffer to satisfy TS (we know it's standard ArrayBuffer from pdf-lib save)
            const buffer = savedBytes.buffer.slice(0) as ArrayBuffer;
            resultBuffers.push(buffer);
        }

        // Return all split files as ArrayBuffers
        self.postMessage({ type: 'SUCCESS', payload: resultBuffers }, resultBuffers);

    } catch (error) {
        throw error;
    }
}
