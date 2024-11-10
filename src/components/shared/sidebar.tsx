import HeaderNav from '@/components/shared/header-nav';
import { navItems, subNavItems } from '@/constants/data';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/ui/icons';
export default function Sidebar() {
  return (
    <nav
      className={cn(
        `relative z-10 mx-auto hidden w-[80%] flex-none  px-3 md:block`,
        status && 'duration-500',
        'w-full'
      )}
    >
      <div
        className={cn('mx-auto w-[80%] px-0 py-5 md:px-2', 'justify-center ')}
      >
        <div className=" flex  items-center justify-between">
          <>
            <div className="text-[20px] font-bold">G-Local Shoes</div>
            <div className="flex gap-2">
              {subNavItems.map((item, index) => {
                const Icon = Icons[item.icon || 'arrowRight'];
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:text-muted-foreground"
                  >
                    <Icon className={`ml-2.5 size-5`} />
                    <span className="mr-2 truncate text-[13px]">
                      {item.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        </div>
        <div className=" space-y-4 py-4">
          <HeaderNav items={navItems} />
        </div>
      </div>
    </nav>
  );
}
