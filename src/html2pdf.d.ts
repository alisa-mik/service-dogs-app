declare module 'html2pdf.js' {
  interface Html2PdfOptions {
    margin?: string | number;
    filename?: string;
    html2canvas?: object;
    jsPDF?: object;
    [key: string]: any;
  }

  interface Html2Pdf {
    from(element: HTMLElement): this;
    set(options: Html2PdfOptions): this;
    save(filename?: string): Promise<void>;
    toPdf(): Promise<this>;
  }

  function html2pdf(): Html2Pdf;

  export = html2pdf;
}