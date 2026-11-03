import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/layout/Layout';
import { ScrollToTop } from './components/common/ScrollToTop';

// Pages
import { HomePage } from './pages/Home/HomePage';
import { PDFToolsHub } from './pages/PDFTools/PDFToolsHub';
import { ImageToolsHub } from './pages/ImageTools/ImageToolsHub';
import { DeveloperToolsHub } from './pages/DeveloperTools/DeveloperToolsHub';

// PDF Tools
import { ImageToPDFPage } from './pages/PDFTools/ImageToPDFPage';
import { MergePDFPage } from './pages/PDFTools/MergePDFPage';
import { SplitPDFPage } from './pages/PDFTools/SplitPDFPage';
import { CompressPDFPage } from './pages/PDFTools/CompressPDFPage';

// Image Tools
import { ImageCompressorPage } from './pages/ImageTools/ImageCompressorPage';
import { ImageResizerPage } from './pages/ImageTools/ImageResizerPage';
import { JpgToPngPage } from './pages/ImageTools/JpgToPngPage';
import { PngToJpgPage } from './pages/ImageTools/PngToJpgPage';

// Developer Tools
import { JsonFormatterPage } from './pages/DeveloperTools/JsonFormatterPage';
import { Base64Page } from './pages/DeveloperTools/Base64Page';

// Legal & Info Pages
import { AboutPage } from './pages/Legal/AboutPage';
import { ContactPage } from './pages/Legal/ContactPage';
import { PrivacyPage } from './pages/Legal/PrivacyPage';
import { TermsPage } from './pages/Legal/TermsPage';
import { DisclaimerPage } from './pages/Legal/DisclaimerPage';
import { NotFoundPage } from './pages/Legal/NotFoundPage';

export const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <ScrollToTop />
          <Layout>
            <Routes>
              {/* Home */}
              <Route path="/" element={<HomePage />} />

              {/* Category Hubs */}
              <Route path="/pdf-tools" element={<PDFToolsHub />} />
              <Route path="/image-tools" element={<ImageToolsHub />} />
              <Route path="/developer-tools" element={<DeveloperToolsHub />} />

              {/* PDF Tools */}
              <Route path="/tools/image-to-pdf" element={<ImageToPDFPage />} />
              <Route path="/tools/merge-pdf" element={<MergePDFPage />} />
              <Route path="/tools/split-pdf" element={<SplitPDFPage />} />
              <Route path="/tools/compress-pdf" element={<CompressPDFPage />} />

              {/* Image Tools */}
              <Route path="/tools/image-compressor" element={<ImageCompressorPage />} />
              <Route path="/tools/image-resizer" element={<ImageResizerPage />} />
              <Route path="/tools/jpg-to-png" element={<JpgToPngPage />} />
              <Route path="/tools/png-to-jpg" element={<PngToJpgPage />} />

              {/* Developer Tools */}
              <Route path="/tools/json-formatter" element={<JsonFormatterPage />} />
              <Route path="/tools/base64-encoder-decoder" element={<Base64Page />} />

              {/* Legal & Info Pages */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy-policy" element={<PrivacyPage />} />
              <Route path="/terms-and-conditions" element={<TermsPage />} />
              <Route path="/disclaimer" element={<DisclaimerPage />} />

              {/* 404 Fallback */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
