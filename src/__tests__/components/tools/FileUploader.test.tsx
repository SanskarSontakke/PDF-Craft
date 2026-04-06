import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FileUploader } from '@/components/tools/FileUploader';

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string, params?: Record<string, unknown>) => {
    const translations: Record<string, string> = {
      'buttons.upload': 'Upload Files',
      'buttons.cancel': 'Cancel',
    };
    if (key === 'fileTooLarge') {
      return `File size exceeds ${params?.maxSize}MB limit`;
    }
    if (key === 'fileTypeInvalid') {
      return `Invalid file type. Accepted: ${params?.acceptedTypes}`;
    }
    return translations[key] || key;
  },
}));

/**
 * Create a mock File object
 */
function createMockFile(
  name: string,
  size: number,
  type: string
): File {
  const content = new Array(size).fill('a').join('');
  return new File([content], name, { type });
}

/**
 * Create a mock DataTransfer object for drag-drop tests
 */
function createDataTransfer(files: File[]): DataTransfer {
  const dataTransfer = {
    files: files,
    items: files.map(file => ({
      kind: 'file',
      type: file.type,
      getAsFile: () => file,
    })),
    types: ['Files'],
    getData: vi.fn(),
    setData: vi.fn(),
    clearData: vi.fn(),
    setDragImage: vi.fn(),
  } as unknown as DataTransfer;
  
  return dataTransfer;
}

describe('FileUploader', () => {
  const mockOnFilesSelected = vi.fn();
  const mockOnError = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<FileUploader onFilesSelected={mockOnFilesSelected} />);
      
      const fileInput = document.querySelector('input[type="file"]');
      expect(fileInput).toBeInTheDocument();
      expect(screen.getByText(/drag and drop/i)).toBeInTheDocument();
    });

    it('renders with custom label', () => {
      render(
        <FileUploader 
          onFilesSelected={mockOnFilesSelected}
          label="Select PDF Files"
        />
      );
      
      expect(screen.getByText('Select PDF Files')).toBeInTheDocument();
    });

    it('renders with custom description', () => {
      render(
        <FileUploader 
          onFilesSelected={mockOnFilesSelected}
          description="Custom upload description"
        />
      );
      
      expect(screen.getByText('Custom upload description')).toBeInTheDocument();
    });

    it('displays accepted file types', () => {
      render(
        <FileUploader 
          onFilesSelected={mockOnFilesSelected}
          accept={['application/pdf', 'image/png']}
        />
      );
      
      expect(screen.getByText(/application\/pdf, image\/png/)).toBeInTheDocument();
    });

    it('displays max file size', () => {
      render(
        <FileUploader 
          onFilesSelected={mockOnFilesSelected}
          maxSize={50 * 1024 * 1024} // 50MB
        />
      );
      
      expect(screen.getByText(/50MB/)).toBeInTheDocument();
    });

    it('displays max files when multiple is enabled', () => {
      render(
        <FileUploader 
          onFilesSelected={mockOnFilesSelected}
          multiple={true}
          maxFiles={5}
        />
      );
      
      expect(screen.getByText(/Files: 5/)).toBeInTheDocument();
    });
  });

  describe('File Picker', () => {
    it('opens file picker on click', async () => {
      render(<FileUploader onFilesSelected={mockOnFilesSelected} />);
      
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      const dropZone = fileInput.parentElement as HTMLElement;
      
      const clickSpy = vi.spyOn(fileInput, 'click');
      
      fireEvent.click(dropZone);
      
      expect(clickSpy).toHaveBeenCalled();
    });

    it('opens file picker on Enter key', () => {
      render(<FileUploader onFilesSelected={mockOnFilesSelected} />);
      
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      const dropZone = fileInput.parentElement as HTMLElement;
      
      const clickSpy = vi.spyOn(fileInput, 'click');
      
      fireEvent.keyDown(dropZone, { key: 'Enter' });
      
      expect(clickSpy).toHaveBeenCalled();
    });

    it('opens file picker on Space key', () => {
      render(<FileUploader onFilesSelected={mockOnFilesSelected} />);
      
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      const dropZone = fileInput.parentElement as HTMLElement;
      
      const clickSpy = vi.spyOn(fileInput, 'click');
      
      fireEvent.keyDown(dropZone, { key: ' ' });
      
      expect(clickSpy).toHaveBeenCalled();
    });

    it('handles file selection from input', async () => {
      render(<FileUploader onFilesSelected={mockOnFilesSelected} />);
      
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      const mockFile = createMockFile('test.pdf', 1024, 'application/pdf');
      
      Object.defineProperty(fileInput, 'files', {
        value: [mockFile],
        writable: false,
      });
      
      fireEvent.change(fileInput);
      
      vi.advanceTimersByTime(3000);
      expect(mockOnFilesSelected).toHaveBeenCalledWith([mockFile]);
    });
  });

  describe('Drag and Drop', () => {
    it('shows drag overlay when dragging over', () => {
      render(<FileUploader onFilesSelected={mockOnFilesSelected} />);
      
      const fileInput = document.querySelector('input[type="file"]');
      const dropZone = fileInput?.parentElement as HTMLElement;
      const mockFile = createMockFile('test.pdf', 1024, 'application/pdf');
      const dataTransfer = createDataTransfer([mockFile]);
      
      fireEvent.dragEnter(dropZone, { dataTransfer });
      
      expect(screen.getByText('Drop files here')).toBeInTheDocument();
    });

    it('hides drag overlay when dragging leaves', () => {
      render(<FileUploader onFilesSelected={mockOnFilesSelected} />);
      
      const fileInput = document.querySelector('input[type="file"]');
      const dropZone = fileInput?.parentElement as HTMLElement;
      const mockFile = createMockFile('test.pdf', 1024, 'application/pdf');
      const dataTransfer = createDataTransfer([mockFile]);
      
      fireEvent.dragEnter(dropZone, { dataTransfer });
      expect(screen.getByText('Drop files here')).toBeInTheDocument();
      
      fireEvent.dragLeave(dropZone, { dataTransfer });
      expect(screen.queryByText('Drop files here')).not.toBeInTheDocument();
    });

    it('handles file drop', () => {
      render(<FileUploader onFilesSelected={mockOnFilesSelected} />);
      
      const fileInput = document.querySelector('input[type="file"]');
      const dropZone = fileInput?.parentElement as HTMLElement;
      const mockFile = createMockFile('test.pdf', 1024, 'application/pdf');
      const dataTransfer = createDataTransfer([mockFile]);
      
      fireEvent.drop(dropZone, { dataTransfer });
      
      vi.advanceTimersByTime(3000);
      expect(mockOnFilesSelected).toHaveBeenCalledWith([mockFile]);
    });

    it('handles multiple file drop when multiple is enabled', () => {
      render(
        <FileUploader 
          onFilesSelected={mockOnFilesSelected}
          multiple={true}
        />
      );
      
      const fileInput = document.querySelector('input[type="file"]');
      const dropZone = fileInput?.parentElement as HTMLElement;
      const mockFiles = [
        createMockFile('test1.pdf', 1024, 'application/pdf'),
        createMockFile('test2.pdf', 1024, 'application/pdf'),
      ];
      const dataTransfer = createDataTransfer(mockFiles);
      
      fireEvent.drop(dropZone, { dataTransfer });
      
      vi.advanceTimersByTime(3000);
      expect(mockOnFilesSelected).toHaveBeenCalledWith(mockFiles);
    });
  });

  describe('Validation', () => {
    it('rejects files exceeding max size', () => {
      render(
        <FileUploader 
          onFilesSelected={mockOnFilesSelected}
          onError={mockOnError}
          maxSize={1024} // 1KB
        />
      );
      
      const fileInput = document.querySelector('input[type="file"]');
      const dropZone = fileInput?.parentElement as HTMLElement;
      const largeFile = createMockFile('large.pdf', 2048, 'application/pdf');
      const dataTransfer = createDataTransfer([largeFile]);
      
      fireEvent.drop(dropZone, { dataTransfer });
      
      expect(mockOnError).toHaveBeenCalled();
      expect(mockOnFilesSelected).not.toHaveBeenCalled();
    });

    it('rejects invalid file types', () => {
      render(
        <FileUploader 
          onFilesSelected={mockOnFilesSelected}
          onError={mockOnError}
          accept={['application/pdf']}
        />
      );
      
      const fileInput = document.querySelector('input[type="file"]');
      const dropZone = fileInput?.parentElement as HTMLElement;
      const invalidFile = createMockFile('test.txt', 1024, 'text/plain');
      const dataTransfer = createDataTransfer([invalidFile]);
      
      fireEvent.drop(dropZone, { dataTransfer });
      
      expect(mockOnError).toHaveBeenCalled();
      expect(mockOnFilesSelected).not.toHaveBeenCalled();
    });

    it('accepts files with .pdf extension even without MIME type', () => {
      render(
        <FileUploader 
          onFilesSelected={mockOnFilesSelected}
          onError={mockOnError}
          accept={['application/pdf']}
        />
      );
      
      const fileInput = document.querySelector('input[type="file"]');
      const dropZone = fileInput?.parentElement as HTMLElement;
      // File with .pdf extension but empty MIME type
      const pdfFile = createMockFile('test.pdf', 1024, '');
      const dataTransfer = createDataTransfer([pdfFile]);
      
      fireEvent.drop(dropZone, { dataTransfer });
      
      vi.advanceTimersByTime(3000);
      expect(mockOnFilesSelected).toHaveBeenCalledWith([pdfFile]);
    });

    it('limits files to maxFiles when multiple is enabled', () => {
      render(
        <FileUploader 
          onFilesSelected={mockOnFilesSelected}
          onError={mockOnError}
          multiple={true}
          maxFiles={2}
        />
      );
      
      const fileInput = document.querySelector('input[type="file"]');
      const dropZone = fileInput?.parentElement as HTMLElement;
      const mockFiles = [
        createMockFile('test1.pdf', 1024, 'application/pdf'),
        createMockFile('test2.pdf', 1024, 'application/pdf'),
        createMockFile('test3.pdf', 1024, 'application/pdf'),
      ];
      const dataTransfer = createDataTransfer(mockFiles);
      
      fireEvent.drop(dropZone, { dataTransfer });
      
      expect(mockOnError).toHaveBeenCalled();
      // Should still call with first 2 files
      vi.advanceTimersByTime(3000);
      expect(mockOnFilesSelected).toHaveBeenCalledWith([mockFiles[0], mockFiles[1]]);
    });

    it('only accepts first file when multiple is disabled', () => {
      render(
        <FileUploader 
          onFilesSelected={mockOnFilesSelected}
          onError={mockOnError}
          multiple={false}
        />
      );
      
      const fileInput = document.querySelector('input[type="file"]');
      const dropZone = fileInput?.parentElement as HTMLElement;
      const mockFiles = [
        createMockFile('test1.pdf', 1024, 'application/pdf'),
        createMockFile('test2.pdf', 1024, 'application/pdf'),
      ];
      const dataTransfer = createDataTransfer(mockFiles);
      
      fireEvent.drop(dropZone, { dataTransfer });
      
      vi.advanceTimersByTime(3000);
      expect(mockOnFilesSelected).toHaveBeenCalledWith([mockFiles[0]]);
    });
  });

  describe('Disabled State', () => {
    it('does not open file picker when disabled', () => {
      render(
        <FileUploader 
          onFilesSelected={mockOnFilesSelected}
          disabled={true}
        />
      );
      
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      const dropZone = fileInput?.parentElement as HTMLElement;
      
      const clickSpy = vi.spyOn(fileInput, 'click');
      
      fireEvent.click(dropZone);
      
      expect(clickSpy).not.toHaveBeenCalled();
    });

    it('does not handle drop when disabled', () => {
      render(
        <FileUploader 
          onFilesSelected={mockOnFilesSelected}
          disabled={true}
        />
      );
      
      const fileInput = document.querySelector('input[type="file"]');
      const dropZone = fileInput?.parentElement as HTMLElement;
      const mockFile = createMockFile('test.pdf', 1024, 'application/pdf');
      const dataTransfer = createDataTransfer([mockFile]);
      
      fireEvent.drop(dropZone, { dataTransfer });
      
      expect(mockOnFilesSelected).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has proper aria-label on input element', () => {
      render(<FileUploader onFilesSelected={mockOnFilesSelected} />);
      
      const fileInput = document.querySelector('input[type="file"]');
      expect(fileInput).toHaveAttribute('aria-label');
    });

    it('is focusable by default via the input element', () => {
      render(<FileUploader onFilesSelected={mockOnFilesSelected} />);
      
      const fileInput = document.querySelector('input[type="file"]');
      expect(fileInput).not.toBeDisabled();
      expect(fileInput).toHaveAttribute('aria-label');
    });

    it('is not focusable when disabled', () => {
      render(
        <FileUploader 
          onFilesSelected={mockOnFilesSelected}
          disabled={true}
        />
      );
      
      const fileInput = document.querySelector('input[type="file"]');
      expect(fileInput).toBeDisabled();
      expect(fileInput).toHaveAttribute('aria-disabled', 'true');
    });

    it('has sr-only file input instead of hidden', () => {
      render(<FileUploader onFilesSelected={mockOnFilesSelected} />);
      
      const fileInput = document.querySelector('input[type="file"]');
      expect(fileInput).toHaveClass('sr-only');
      expect(fileInput).not.toHaveAttribute('aria-hidden', 'true');
    });
  });
});
