// Layout Types
export interface LayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  pageDescription?: string;
  showGhostLogo?: boolean;
  customLinks?: Array<{
    href: string;
    label: string;
  }>;
  ctaButton?: {
    text: string;
    onClick: () => void;
    icon?: string;
  };
}

// Container Types
export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

// Section Types
export interface SectionProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'none' | 'dark' | 'light' | 'gradient';
  id?: string;
}

// Tab Navigation Types
export interface Tab {
  id: string;
  label: string;
}

export interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

// Footer Types
export interface FooterProps {
  className?: string;
}

// Navigation Types
export interface NavigationLink {
  href: string;
  label: string;
  icon?: string;
}

export interface NavigationProps {
  links: NavigationLink[];
  activeLink?: string;
  onLinkClick?: (href: string) => void;
}
