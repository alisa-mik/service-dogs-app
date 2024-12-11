declare module 'html2pdf.js' {
    interface Html2PdfOptions {
      margin?: string | number;
      filename?: string;
      html2canvas?: object;
      jsPDF?: object;
      [key: string]: any;
    }
  
    function html2pdf(element: HTMLElement, options?: Html2PdfOptions): void;
    export = html2pdf;
  }