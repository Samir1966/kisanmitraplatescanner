
import React from 'react';
import type { AnalysisResult } from '../types';
import { CheckCircle, AlertCircle, Sparkles, ShieldCheck, Bug } from 'lucide-react';

interface ResultCardProps {
  result: AnalysisResult | null;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  if (!result) {
    return null;
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 space-y-6 animate-fade-in">
      <div>
        <h4 className="flex items-center text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
          <Sparkles className="w-5 h-5 mr-2 text-yellow-500" />
          Plant Identity
        </h4>
        <p className="text-2xl font-bold text-green-800 dark:text-green-300">{result.plantName}</p>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h4 className="flex items-center text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
          {result.isHealthy ? (
            <ShieldCheck className="w-5 h-5 mr-2 text-green-500" />
          ) : (
            <Bug className="w-5 h-5 mr-2 text-red-500" />
          )}
          Health Status
        </h4>
        {result.isHealthy ? (
          <div className="flex items-center bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-lg p-4">
            <CheckCircle className="h-6 w-6 mr-3 flex-shrink-0" />
            <div>
              <p className="font-bold">Your plant is healthy!</p>
              <p className="text-sm">No diseases detected. Keep up the great care.</p>
            </div>
          </div>
        ) : (
          <div className="flex items-start bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-lg p-4">
            <AlertCircle className="h-6 w-6 mr-3 mt-1 flex-shrink-0" />
            <div>
              <p className="font-bold">Disease Detected: {result.disease?.name || 'Unknown'}</p>
              <p className="text-sm mt-2 text-red-700 dark:text-red-300">{result.disease?.description}</p>
            </div>
          </div>
        )}
      </div>

      {!result.isHealthy && result.disease && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">Recommended Solution</h4>
          <ol className="space-y-3 list-decimal list-inside text-gray-600 dark:text-gray-400">
            {result.disease.solution.map((step, index) => (
              <li key={index} className="pl-2 leading-relaxed">{step}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default ResultCard;
