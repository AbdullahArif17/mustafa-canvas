export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col justify-between rounded-xl bg-white p-5 shadow-sm ring-1 ring-emerald-100/80">
      <div className="space-y-4">
        <div className="aspect-[4/3] w-full rounded-lg animate-shimmer" />
        <div className="flex items-center justify-between">
          <div className="h-6 w-20 rounded-full animate-shimmer" />
          <div className="h-8 w-8 rounded-full animate-shimmer" />
        </div>
        <div className="h-6 w-3/4 rounded-md animate-shimmer" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded animate-shimmer" />
          <div className="h-4 w-5/6 rounded animate-shimmer" />
        </div>
        <div className="flex gap-2 pt-1">
          <div className="h-6 w-24 rounded-md animate-shimmer" />
          <div className="h-6 w-20 rounded-md animate-shimmer" />
        </div>
      </div>
      <div className="mt-5 h-11 w-full rounded-lg animate-shimmer" />
    </div>
  );
}

