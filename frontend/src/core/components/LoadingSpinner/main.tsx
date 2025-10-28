import { getLoadingSpinnerClassName } from './variants';
import type { LoadingSpinnerProps } from './types';

/**
 * @component LoadingSpinner
 * @summary Loading spinner component with size variants
 * @domain core
 * @type ui-component
 * @category feedback
 */
export const LoadingSpinner = ({ size = 'medium', className }: LoadingSpinnerProps) => {
  return (
    <div className={getLoadingSpinnerClassName({ size, className })}>
      <div className="animate-spin rounded-full border-4 border-gray-300 border-t-primary-600" />
    </div>
  );
};
