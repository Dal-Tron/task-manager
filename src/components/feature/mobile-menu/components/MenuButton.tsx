import { Bars3Icon } from '@heroicons/react/24/outline';

interface MobileMenuButtonProps {
  onClick: () => void;
}

export const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className="lg:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
  >
    <span className="sr-only">Open main menu</span>
    <Bars3Icon aria-hidden="true" className="h-6 w-6" />
  </button>
);
