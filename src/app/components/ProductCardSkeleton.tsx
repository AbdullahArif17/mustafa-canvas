export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-sm ring-1 ring-forest-100 doppelrand-card">
      <div>
        <div className="aspect-[16/11] sm:aspect-[4/3] w-full bg-canvas-100/60 animate-shimmer" />
        <div className="p-4 sm:p-5 space-y-4">
          <div className="h-6 w-3/4 rounded-lg animate-shimmer" />
          <div className="space-y-2">
            <div className="h-3.5 w-full rounded animate-shimmer" />
            <div className="h-3.5 w-5/6 rounded animate-shimmer" />
          </div>
          <div className="flex gap-2 pt-1">
            <div className="h-5 w-24 rounded-md animate-shimmer" />
            <div className="h-5 w-20 rounded-md animate-shimmer" />
          </div>
        </div>
      </div>
      <div className="px-4 pb-4 sm:px-5 sm:pb-5">
        <div className="h-11 w-full rounded-xl animate-shimmer" />
      </div>
    </div>
  );
}
