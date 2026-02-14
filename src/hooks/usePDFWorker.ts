import { useState, useEffect, useCallback, useRef } from 'react';

type WorkerAction = 'MERGE_PDFS' | 'SPLIT_PDF' | 'COMPRESS_PDF';

interface WorkerState {
    isProcessing: boolean;
    error: string | null;
    result: ArrayBuffer | ArrayBuffer[] | null;
}

export function usePDFWorker() {
    const [state, setState] = useState<WorkerState>({
        isProcessing: false,
        error: null,
        result: null,
    });

    const workerRef = useRef<Worker | null>(null);

    useEffect(() => {
        // Initialize worker
        // Note: This relies on Next.js/Webpack worker loader or native ESM worker support
        workerRef.current = new Worker(new URL('../workers/pdf.worker.ts', import.meta.url));

        workerRef.current.onmessage = (e) => {
            const { type, payload, error } = e.data;

            if (type === 'SUCCESS') {
                setState({ isProcessing: false, error: null, result: payload });
            } else if (type === 'ERROR') {
                setState({ isProcessing: false, error: error, result: null });
            }
        };

        workerRef.current.onerror = (err) => {
            setState({ isProcessing: false, error: 'Worker error: ' + err.message, result: null });
        };

        return () => {
            workerRef.current?.terminate();
        };
    }, []);

    const processPDF = useCallback((action: WorkerAction, data: any) => {
        if (!workerRef.current) return;

        setState(prev => ({ ...prev, isProcessing: true, error: null, result: null }));

        workerRef.current.postMessage({ type: action, payload: data });
    }, []);

    return {
        ...state,
        processPDF,
        reset: () => setState({ isProcessing: false, error: null, result: null })
    };
}
