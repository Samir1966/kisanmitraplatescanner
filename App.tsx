
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import ResultCard from './components/ResultCard';
import Loader from './components/Loader';
import Footer from './components/Footer';
import { analyzePlantImage } from './services/geminiService';
import type { AnalysisResult } from './types';
import { Leaf, AlertTriangle } from 'lucide-react';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = useCallback((file: File | null) => {
    if (file) {
      setImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
      setAnalysisResult(null);
      setError(null);
    }
  }, []);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // Remove the data URL prefix e.g. "data:image/jpeg;base64,"
        resolve(result.split(',')[1]);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleAnalyzeClick = async () => {
    if (!imageFile) {
      setError("Please select an image first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const base64Image = await fileToBase64(imageFile);
      const result = await analyzePlantImage(base64Image, imageFile.type);
      setAnalysisResult(result);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze the image. The model may not be able to process this request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetState = () => {
    setImageFile(null);
    setImagePreviewUrl(null);
    setAnalysisResult(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-green-50/50 dark:bg-gray-900/95 text-gray-800 dark:text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300">
          <div className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-green-700 dark:text-green-400 mb-2">Upload Your Plant Image</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Let our AI analyze your plant's health and provide expert solutions.</p>
            
            <FileUpload onFileSelect={handleFileSelect} imagePreviewUrl={imagePreviewUrl} />

            {imagePreviewUrl && (
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <button
                  onClick={handleAnalyzeClick}
                  disabled={isLoading}
                  className="w-full flex-1 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-300 disabled:cursor-not-allowed transition-colors"
                >
                  <Leaf className="w-5 h-5 mr-2" />
                  {isLoading ? 'Analyzing...' : 'Scan Plant'}
                </button>
                 <button
                  onClick={resetState}
                  disabled={isLoading}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          {isLoading && <Loader />}
          
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-4 mx-8 mb-8 rounded-r-lg">
              <div className="flex items-center">
                <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
                <div>
                  <p className="font-bold text-red-800 dark:text-red-300">Error</p>
                  <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                </div>
              </div>
            </div>
          )}

          {analysisResult && (
            <div className="p-6 md:p-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-xl md:text-2xl font-bold text-green-700 dark:text-green-400 mb-4">Analysis Result</h3>
              <ResultCard result={analysisResult} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
