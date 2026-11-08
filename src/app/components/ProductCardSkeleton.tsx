export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col justify-between rounded-2xl bg-white p-5 shadow-sm ring-1 ring-forest-100 doppelrand-card">
      <div className="space-y-4">
        <div className="aspect-[4/3] w-full rounded-xl bg-canvas-100/60 animate-shimmer" />
        <div className="flex items-center justify-between">
          <div className="h-6 w-20 rounded-full animate-shimmer" />
          <div className="h-6 w-6 rounded-full animate-shimmer" />
        </div>
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
      <div className="mt-5 h-11 w-full rounded-xl animate-shimmer" />
    </div>
  );
}
