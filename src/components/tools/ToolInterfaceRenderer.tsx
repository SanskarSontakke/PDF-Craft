'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Loading spinner component shown while tool chunks load
const ToolLoadingFallback = () => (
    <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[hsl(var(--color-primary))]" />
    </div>
);

// Lazy-loaded tool components — each is code-split into its own chunk
const MergePDFTool = dynamic(() => import('@/components/tools/merge').then(m => ({ default: m.MergePDFTool })), { ssr: false, loading: ToolLoadingFallback });
const SplitPDFTool = dynamic(() => import('@/components/tools/split').then(m => ({ default: m.SplitPDFTool })), { ssr: false, loading: ToolLoadingFallback });
const DeletePagesTool = dynamic(() => import('@/components/tools/delete').then(m => ({ default: m.DeletePagesTool })), { ssr: false, loading: ToolLoadingFallback });
const RotatePDFTool = dynamic(() => import('@/components/tools/rotate').then(m => ({ default: m.RotatePDFTool })), { ssr: false, loading: ToolLoadingFallback });
const AddBlankPageTool = dynamic(() => import('@/components/tools/add-blank-page').then(m => ({ default: m.AddBlankPageTool })), { ssr: false, loading: ToolLoadingFallback });
const ReversePagesTool = dynamic(() => import('@/components/tools/reverse').then(m => ({ default: m.ReversePagesTool })), { ssr: false, loading: ToolLoadingFallback });
const NUpPDFTool = dynamic(() => import('@/components/tools/n-up').then(m => ({ default: m.NUpPDFTool })), { ssr: false, loading: ToolLoadingFallback });
const AlternateMergeTool = dynamic(() => import('@/components/tools/alternate-merge').then(m => ({ default: m.AlternateMergeTool })), { ssr: false, loading: ToolLoadingFallback });
const DividePagesTool = dynamic(() => import('@/components/tools/divide').then(m => ({ default: m.DividePagesTool })), { ssr: false, loading: ToolLoadingFallback });
const CombineSinglePageTool = dynamic(() => import('@/components/tools/combine-single-page').then(m => ({ default: m.CombineSinglePageTool })), { ssr: false, loading: ToolLoadingFallback });
const GridCombineTool = dynamic(() => import('@/components/tools/grid-combine').then(m => ({ default: m.GridCombineTool })), { ssr: false, loading: ToolLoadingFallback });
const PosterizePDFTool = dynamic(() => import('@/components/tools/posterize').then(m => ({ default: m.PosterizePDFTool })), { ssr: false, loading: ToolLoadingFallback });
const PDFMultiTool = dynamic(() => import('@/components/tools/pdf-multi-tool').then(m => ({ default: m.PDFMultiTool })), { ssr: false, loading: ToolLoadingFallback });
const AddAttachmentsTool = dynamic(() => import('@/components/tools/add-attachments').then(m => ({ default: m.AddAttachmentsTool })), { ssr: false, loading: ToolLoadingFallback });
const ExtractAttachmentsTool = dynamic(() => import('@/components/tools/extract-attachments').then(m => ({ default: m.ExtractAttachmentsTool })), { ssr: false, loading: ToolLoadingFallback });
const ExtractImagesTool = dynamic(() => import('@/components/tools/extract-images').then(m => ({ default: m.ExtractImagesTool })), { ssr: false, loading: ToolLoadingFallback });
const EditAttachmentsTool = dynamic(() => import('@/components/tools/edit-attachments').then(m => ({ default: m.EditAttachmentsTool })), { ssr: false, loading: ToolLoadingFallback });
const ViewMetadataTool = dynamic(() => import('@/components/tools/view-metadata').then(m => ({ default: m.ViewMetadataTool })), { ssr: false, loading: ToolLoadingFallback });
const EditMetadataTool = dynamic(() => import('@/components/tools/edit-metadata').then(m => ({ default: m.EditMetadataTool })), { ssr: false, loading: ToolLoadingFallback });
const PDFsToZipTool = dynamic(() => import('@/components/tools/pdf-to-zip').then(m => ({ default: m.PDFsToZipTool })), { ssr: false, loading: ToolLoadingFallback });
const ComparePDFsTool = dynamic(() => import('@/components/tools/compare-pdfs').then(m => ({ default: m.ComparePDFsTool })), { ssr: false, loading: ToolLoadingFallback });
const EditPDFTool = dynamic(() => import('@/components/tools/edit-pdf').then(m => ({ default: m.EditPDFTool })), { ssr: false, loading: ToolLoadingFallback });
const ImageToPDFTool = dynamic(() => import('@/components/tools/image-to-pdf').then(m => ({ default: m.ImageToPDFTool })), { ssr: false, loading: ToolLoadingFallback });
const TextToPDFTool = dynamic(() => import('@/components/tools/text-to-pdf').then(m => ({ default: m.TextToPDFTool })), { ssr: false, loading: ToolLoadingFallback });
const PSDToPDFTool = dynamic(() => import('@/components/tools/psd-to-pdf').then(m => ({ default: m.PSDToPDFTool })), { ssr: false, loading: ToolLoadingFallback });
const JSONToPDFTool = dynamic(() => import('@/components/tools/json-to-pdf').then(m => ({ default: m.JSONToPDFTool })), { ssr: false, loading: ToolLoadingFallback });
const FixPageSizeTool = dynamic(() => import('@/components/tools/fix-page-size').then(m => ({ default: m.FixPageSizeTool })), { ssr: false, loading: ToolLoadingFallback });
const CompressPDFTool = dynamic(() => import('@/components/tools/compress').then(m => ({ default: m.CompressPDFTool })), { ssr: false, loading: ToolLoadingFallback });
const SignPDFTool = dynamic(() => import('@/components/tools/sign').then(m => ({ default: m.SignPDFTool })), { ssr: false, loading: ToolLoadingFallback });
const CropPDFTool = dynamic(() => import('@/components/tools/crop').then(m => ({ default: m.CropPDFTool })), { ssr: false, loading: ToolLoadingFallback });
const OrganizePDFTool = dynamic(() => import('@/components/tools/organize').then(m => ({ default: m.OrganizePDFTool })), { ssr: false, loading: ToolLoadingFallback });
const ExtractPagesTool = dynamic(() => import('@/components/tools/extract').then(m => ({ default: m.ExtractPagesTool })), { ssr: false, loading: ToolLoadingFallback });
const BookmarkTool = dynamic(() => import('@/components/tools/bookmark').then(m => ({ default: m.BookmarkTool })), { ssr: false, loading: ToolLoadingFallback });
const PageNumbersTool = dynamic(() => import('@/components/tools/page-numbers').then(m => ({ default: m.PageNumbersTool })), { ssr: false, loading: ToolLoadingFallback });
const WatermarkTool = dynamic(() => import('@/components/tools/watermark').then(m => ({ default: m.WatermarkTool })), { ssr: false, loading: ToolLoadingFallback });
const HeaderFooterTool = dynamic(() => import('@/components/tools/header-footer').then(m => ({ default: m.HeaderFooterTool })), { ssr: false, loading: ToolLoadingFallback });
const InvertColorsTool = dynamic(() => import('@/components/tools/invert-colors').then(m => ({ default: m.InvertColorsTool })), { ssr: false, loading: ToolLoadingFallback });
const BackgroundColorTool = dynamic(() => import('@/components/tools/background-color').then(m => ({ default: m.BackgroundColorTool })), { ssr: false, loading: ToolLoadingFallback });
const StampsTool = dynamic(() => import('@/components/tools/stamps').then(m => ({ default: m.StampsTool })), { ssr: false, loading: ToolLoadingFallback });
const RemoveAnnotationsTool = dynamic(() => import('@/components/tools/remove-annotations').then(m => ({ default: m.RemoveAnnotationsTool })), { ssr: false, loading: ToolLoadingFallback });
const FormFillerTool = dynamic(() => import('@/components/tools/form-filler').then(m => ({ default: m.FormFillerTool })), { ssr: false, loading: ToolLoadingFallback });
const FormCreatorTool = dynamic(() => import('@/components/tools/form-creator').then(m => ({ default: m.FormCreatorTool })), { ssr: false, loading: ToolLoadingFallback });
const RemoveBlankPagesTool = dynamic(() => import('@/components/tools/remove-blank-pages').then(m => ({ default: m.RemoveBlankPagesTool })), { ssr: false, loading: ToolLoadingFallback });
const PDFToImageTool = dynamic(() => import('@/components/tools/pdf-to-image').then(m => ({ default: m.PDFToImageTool })), { ssr: false, loading: ToolLoadingFallback });
const PDFToGreyscaleTool = dynamic(() => import('@/components/tools/pdf-to-greyscale').then(m => ({ default: m.PDFToGreyscaleTool })), { ssr: false, loading: ToolLoadingFallback });
const PDFToJSONTool = dynamic(() => import('@/components/tools/pdf-to-json').then(m => ({ default: m.PDFToJSONTool })), { ssr: false, loading: ToolLoadingFallback });
const OCRPDFTool = dynamic(() => import('@/components/tools/ocr').then(m => ({ default: m.OCRPDFTool })), { ssr: false, loading: ToolLoadingFallback });
const LinearizePDFTool = dynamic(() => import('@/components/tools/linearize').then(m => ({ default: m.LinearizePDFTool })), { ssr: false, loading: ToolLoadingFallback });
const PageDimensionsTool = dynamic(() => import('@/components/tools/page-dimensions').then(m => ({ default: m.PageDimensionsTool })), { ssr: false, loading: ToolLoadingFallback });
const RemoveRestrictionsTool = dynamic(() => import('@/components/tools/remove-restrictions').then(m => ({ default: m.RemoveRestrictionsTool })), { ssr: false, loading: ToolLoadingFallback });
const EncryptPDFTool = dynamic(() => import('@/components/tools/encrypt').then(m => ({ default: m.EncryptPDFTool })), { ssr: false, loading: ToolLoadingFallback });
const DecryptPDFTool = dynamic(() => import('@/components/tools/decrypt').then(m => ({ default: m.DecryptPDFTool })), { ssr: false, loading: ToolLoadingFallback });
const SanitizePDFTool = dynamic(() => import('@/components/tools/sanitize').then(m => ({ default: m.SanitizePDFTool })), { ssr: false, loading: ToolLoadingFallback });
const FlattenPDFTool = dynamic(() => import('@/components/tools/flatten').then(m => ({ default: m.FlattenPDFTool })), { ssr: false, loading: ToolLoadingFallback });
const RemoveMetadataTool = dynamic(() => import('@/components/tools/remove-metadata').then(m => ({ default: m.RemoveMetadataTool })), { ssr: false, loading: ToolLoadingFallback });
const ChangePermissionsTool = dynamic(() => import('@/components/tools/change-permissions').then(m => ({ default: m.ChangePermissionsTool })), { ssr: false, loading: ToolLoadingFallback });
const RepairPDFTool = dynamic(() => import('@/components/tools/repair').then(m => ({ default: m.RepairPDFTool })), { ssr: false, loading: ToolLoadingFallback });
const TableOfContentsTool = dynamic(() => import('@/components/tools/table-of-contents').then(m => ({ default: m.TableOfContentsTool })), { ssr: false, loading: ToolLoadingFallback });
const TextColorTool = dynamic(() => import('@/components/tools/text-color').then(m => ({ default: m.TextColorTool })), { ssr: false, loading: ToolLoadingFallback });
const PDFToDocxTool = dynamic(() => import('@/components/tools/pdf-to-docx').then(m => ({ default: m.PDFToDocxTool })), { ssr: false, loading: ToolLoadingFallback });
const PDFToPptxTool = dynamic(() => import('@/components/tools/pdf-to-pptx').then(m => ({ default: m.PDFToPptxTool })), { ssr: false, loading: ToolLoadingFallback });
const PDFToExcelTool = dynamic(() => import('@/components/tools/pdf-to-excel').then(m => ({ default: m.PDFToExcelTool })), { ssr: false, loading: ToolLoadingFallback });
const RotateCustomTool = dynamic(() => import('@/components/tools/rotate-custom/RotateCustomTool').then(m => ({ default: m.RotateCustomTool })), { ssr: false, loading: ToolLoadingFallback });
const WordToPDFTool = dynamic(() => import('@/components/tools/word-to-pdf').then(m => ({ default: m.WordToPDFTool })), { ssr: false, loading: ToolLoadingFallback });
const ExcelToPDFTool = dynamic(() => import('@/components/tools/excel-to-pdf').then(m => ({ default: m.ExcelToPDFTool })), { ssr: false, loading: ToolLoadingFallback });
const PPTXToPDFTool = dynamic(() => import('@/components/tools/pptx-to-pdf').then(m => ({ default: m.PPTXToPDFTool })), { ssr: false, loading: ToolLoadingFallback });
const XPSToPDFTool = dynamic(() => import('@/components/tools/xps-to-pdf').then(m => ({ default: m.XPSToPDFTool })), { ssr: false, loading: ToolLoadingFallback });
const RTFToPDFTool = dynamic(() => import('@/components/tools/rtf-to-pdf').then(m => ({ default: m.RTFToPDFTool })), { ssr: false, loading: ToolLoadingFallback });
const EPUBToPDFTool = dynamic(() => import('@/components/tools/epub-to-pdf').then(m => ({ default: m.EPUBToPDFTool })), { ssr: false, loading: ToolLoadingFallback });
const MOBIToPDFTool = dynamic(() => import('@/components/tools/mobi-to-pdf').then(m => ({ default: m.MOBIToPDFTool })), { ssr: false, loading: ToolLoadingFallback });
const FB2ToPDFTool = dynamic(() => import('@/components/tools/fb2-to-pdf').then(m => ({ default: m.FB2ToPDFTool })), { ssr: false, loading: ToolLoadingFallback });
const DJVUToPDFTool = dynamic(() => import('@/components/tools/djvu-to-pdf').then(m => ({ default: m.DJVUToPDFTool })), { ssr: false, loading: ToolLoadingFallback });
const PDFToSVGTool = dynamic(() => import('@/components/tools/pdf-to-svg').then(m => ({ default: m.PDFToSVGTool })), { ssr: false, loading: ToolLoadingFallback });
const DeskewPDFTool = dynamic(() => import('@/components/tools/deskew').then(m => ({ default: m.DeskewPDFTool })), { ssr: false, loading: ToolLoadingFallback });
const PDFBookletTool = dynamic(() => import('@/components/tools/pdf-booklet').then(m => ({ default: m.PDFBookletTool })), { ssr: false, loading: ToolLoadingFallback });
const RasterizePDFTool = dynamic(() => import('@/components/tools/rasterize').then(m => ({ default: m.RasterizePDFTool })), { ssr: false, loading: ToolLoadingFallback });
const MarkdownToPDFTool = dynamic(() => import('@/components/tools/markdown-to-pdf').then(m => ({ default: m.MarkdownToPDFTool })), { ssr: false, loading: ToolLoadingFallback });
const EmailToPDFTool = dynamic(() => import('@/components/tools/email-to-pdf').then(m => ({ default: m.EmailToPDFTool })), { ssr: false, loading: ToolLoadingFallback });
const CBZToPDFTool = dynamic(() => import('@/components/tools/cbz-to-pdf').then(m => ({ default: m.CBZToPDFTool })), { ssr: false, loading: ToolLoadingFallback });
const PDFToPDFATool = dynamic(() => import('@/components/tools/pdf-to-pdfa').then(m => ({ default: m.PDFToPDFATool })), { ssr: false, loading: ToolLoadingFallback });
const FontToOutlineTool = dynamic(() => import('@/components/tools/font-to-outline').then(m => ({ default: m.FontToOutlineTool })), { ssr: false, loading: ToolLoadingFallback });
const ExtractTablesTool = dynamic(() => import('@/components/tools/extract-tables').then(m => ({ default: m.ExtractTablesTool })), { ssr: false, loading: ToolLoadingFallback });
const OCGManagerTool = dynamic(() => import('@/components/tools/ocg-manager').then(m => ({ default: m.OCGManagerTool })), { ssr: false, loading: ToolLoadingFallback });
const PDFReaderTool = dynamic(() => import('@/components/tools/pdf-reader').then(m => ({ default: m.PDFReaderTool })), { ssr: false, loading: ToolLoadingFallback });

interface ToolInterfaceRendererProps {
    toolId: string;
}

export function ToolInterfaceRenderer({ toolId }: ToolInterfaceRendererProps) {
    switch (toolId) {
        case 'merge-pdf':
            return <MergePDFTool />;
        case 'split-pdf':
            return <SplitPDFTool />;
        case 'delete-pages':
            return <DeletePagesTool />;
        case 'rotate-pdf':
            return <RotatePDFTool />;
        case 'rotate-custom':
            return <RotateCustomTool />;
        case 'add-blank-page':
            return <AddBlankPageTool />;
        case 'reverse-pages':
            return <ReversePagesTool />;
        case 'n-up-pdf':
            return <NUpPDFTool />;
        case 'grid-combine':
            return <GridCombineTool />;
        case 'alternate-merge':
            return <AlternateMergeTool />;
        case 'divide-pages':
            return <DividePagesTool />;
        case 'combine-single-page':
            return <CombineSinglePageTool />;
        case 'posterize-pdf':
            return <PosterizePDFTool />;
        case 'pdf-multi-tool':
            return <PDFMultiTool />;
        case 'add-attachments':
            return <AddAttachmentsTool />;
        case 'extract-attachments':
            return <ExtractAttachmentsTool />;
        case 'extract-images':
            return <ExtractImagesTool />;
        case 'edit-attachments':
            return <EditAttachmentsTool />;
        case 'view-metadata':
            return <ViewMetadataTool />;
        case 'edit-metadata':
            return <EditMetadataTool />;
        case 'pdf-to-zip':
            return <PDFsToZipTool />;
        case 'compare-pdfs':
            return <ComparePDFsTool />;
        case 'edit-pdf':
            return <EditPDFTool />;
        case 'image-to-pdf':
            return <ImageToPDFTool />;
        case 'jpg-to-pdf':
            return <ImageToPDFTool imageType="jpg" />;
        case 'png-to-pdf':
            return <ImageToPDFTool imageType="png" />;
        case 'webp-to-pdf':
            return <ImageToPDFTool imageType="webp" />;
        case 'bmp-to-pdf':
            return <ImageToPDFTool imageType="bmp" />;
        case 'tiff-to-pdf':
            return <ImageToPDFTool imageType="tiff" />;
        case 'svg-to-pdf':
            return <ImageToPDFTool imageType="svg" />;
        case 'heic-to-pdf':
            return <ImageToPDFTool imageType="heic" />;
        case 'psd-to-pdf':
            return <PSDToPDFTool />;
        case 'txt-to-pdf':
            return <TextToPDFTool />;
        case 'json-to-pdf':
            return <JSONToPDFTool />;
        case 'compress-pdf':
            return <CompressPDFTool />;
        case 'sign-pdf':
            return <SignPDFTool />;
        case 'crop-pdf':
            return <CropPDFTool />;
        case 'fix-page-size':
            return <FixPageSizeTool />;
        case 'organize-pdf':
            return <OrganizePDFTool />;
        case 'extract-pages':
            return <ExtractPagesTool />;
        case 'bookmark':
            return <BookmarkTool />;
        case 'page-numbers':
            return <PageNumbersTool />;
        case 'add-watermark':
            return <WatermarkTool />;
        case 'header-footer':
            return <HeaderFooterTool />;
        case 'invert-colors':
            return <InvertColorsTool />;
        case 'background-color':
            return <BackgroundColorTool />;
        case 'text-color':
            return <TextColorTool />;
        case 'table-of-contents':
            return <TableOfContentsTool />;
        case 'add-stamps':
            return <StampsTool />;
        case 'remove-annotations':
            return <RemoveAnnotationsTool />;
        case 'form-filler':
            return <FormFillerTool />;
        case 'form-creator':
            return <FormCreatorTool />;
        case 'remove-blank-pages':
            return <RemoveBlankPagesTool />;
        case 'pdf-to-jpg':
            return <PDFToImageTool outputFormat="jpg" />;
        case 'pdf-to-png':
            return <PDFToImageTool outputFormat="png" />;
        case 'pdf-to-webp':
            return <PDFToImageTool outputFormat="webp" />;
        case 'pdf-to-bmp':
            return <PDFToImageTool outputFormat="bmp" />;
        case 'pdf-to-tiff':
            return <PDFToImageTool outputFormat="tiff" />;
        case 'pdf-to-svg':
            return <PDFToSVGTool />;
        case 'pdf-to-greyscale':
            return <PDFToGreyscaleTool />;
        case 'pdf-to-json':
            return <PDFToJSONTool />;
        case 'pdf-to-docx':
            return <PDFToDocxTool />;
        case 'pdf-to-pptx':
            return <PDFToPptxTool />;
        case 'pdf-to-excel':
            return <PDFToExcelTool />;
        case 'ocr-pdf':
            return <OCRPDFTool />;
        case 'linearize-pdf':
            return <LinearizePDFTool />;
        case 'page-dimensions':
            return <PageDimensionsTool />;
        case 'remove-restrictions':
            return <RemoveRestrictionsTool />;
        case 'repair-pdf':
            return <RepairPDFTool />;
        case 'encrypt-pdf':
            return <EncryptPDFTool />;
        case 'decrypt-pdf':
            return <DecryptPDFTool />;
        case 'sanitize-pdf':
            return <SanitizePDFTool />;
        case 'flatten-pdf':
            return <FlattenPDFTool />;
        case 'remove-metadata':
            return <RemoveMetadataTool />;
        case 'change-permissions':
            return <ChangePermissionsTool />;
        case 'word-to-pdf':
            return <WordToPDFTool />;
        case 'excel-to-pdf':
            return <ExcelToPDFTool />;
        case 'pptx-to-pdf':
            return <PPTXToPDFTool />;
        case 'xps-to-pdf':
            return <XPSToPDFTool />;
        case 'rtf-to-pdf':
            return <RTFToPDFTool />;
        case 'epub-to-pdf':
            return <EPUBToPDFTool />;
        case 'mobi-to-pdf':
            return <MOBIToPDFTool />;
        case 'fb2-to-pdf':
            return <FB2ToPDFTool />;
        case 'djvu-to-pdf':
            return <DJVUToPDFTool />;
        case 'deskew-pdf':
            return <DeskewPDFTool />;
        case 'pdf-booklet':
            return <PDFBookletTool />;
        case 'rasterize-pdf':
            return <RasterizePDFTool />;
        case 'markdown-to-pdf':
            return <MarkdownToPDFTool />;
        case 'email-to-pdf':
            return <EmailToPDFTool />;
        case 'cbz-to-pdf':
            return <CBZToPDFTool />;
        case 'pdf-to-pdfa':
            return <PDFToPDFATool />;
        case 'font-to-outline':
            return <FontToOutlineTool />;
        case 'extract-tables':
            return <ExtractTablesTool />;
        case 'ocg-manager':
            return <OCGManagerTool />;
        case 'pdf-reader':
            return <PDFReaderTool />;
        default:
            return (
                <div className="p-8 text-center text-[hsl(var(--color-muted-foreground))]">
                    <p>This tool is coming soon!</p>
                </div>
            );
    }
}
