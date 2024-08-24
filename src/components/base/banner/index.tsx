import clsx from 'clsx';

interface BannerSectionProps {
  title: string;
  subtitle: string;
  className?: string;
  backgroundStyle?: React.CSSProperties; // New prop for background style
}

export const BannerSection: React.FC<BannerSectionProps> = ({
  title,
  subtitle,
  className = '',
  backgroundStyle = {},
}) => {
  return (
    <div
      className={clsx(
        'relative text-white py-24 px-10 flex items-center justify-center text-center',
        className
      )}
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(128,128,128,0.2) 1px, transparent 1px), linear-gradient(225deg, rgba(128,128,128,0.2) 1px, transparent 1px)`,
        backgroundSize: '10px 10px',
        ...backgroundStyle,
      }}
    >
      <div className="md:w-1/2">
        <p className="font-bold text-sm uppercase text-gray-400">Services</p>
        <p className="text-3xl font-bold text-gray-900">{title}</p>
        <p className="text-2xl mt-4 leading-none text-gray-600">{subtitle}</p>
      </div>
    </div>
  );
};
