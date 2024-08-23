import { Dialog, DialogPanel } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { ButtonIcon } from '@/components/base/button-icon';

import { Logo } from '../logo';

interface NavigationLink {
  name: string;
  href: string;
}

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  navigation: NavigationLink[];
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  open,
  onClose,
  navigation,
}) => (
  <Dialog open={open} onClose={onClose} className="lg:hidden">
    <div className="fixed inset-0 z-50" />
    <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
      <div className="flex items-center justify-between">
        <Logo />
        <ButtonIcon onClick={onClose} srText="Close menu" icon={XMarkIcon} />
      </div>
      <div className="mt-6 flow-root">
        <div className="-my-6 divide-y divide-gray-500/10">
          <div className="space-y-2 py-6">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="py-6">
            <a
              href="#"
              className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
            >
              Log in
            </a>
          </div>
        </div>
      </div>
    </DialogPanel>
  </Dialog>
);