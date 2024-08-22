interface NavigationLink {
  name: string;
  href: string;
}

interface NavigationLinksProps {
  navigation: NavigationLink[];
}

export const NavigationLinks: React.FC<NavigationLinksProps> = ({
  navigation,
}) => (
  <div className="hidden lg:flex lg:gap-x-12">
    {navigation.map((item) => (
      <a
        key={item.name}
        href={item.href}
        className="text-sm font-semibold leading-6 text-gray-900"
      >
        {item.name}
      </a>
    ))}
  </div>
);
