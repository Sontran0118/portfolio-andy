/**
 * The site mark: two road edges converging toward a vanishing point, with the
 * centre line dashing away between them.
 *
 * The same silhouette reads as a capital A, which is the point — it comes out
 * of the scene the rest of the site is built on rather than being applied on
 * top of it. Geometry is duplicated in `app/icon.svg` and in the favicon
 * generator (`scripts/build-icons.py`); change all three together.
 *
 * Strokes use `currentColor` so the nav controls its own colour.
 */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <g stroke="currentColor" strokeLinecap="round">
        {/* Road edges. They stop short of meeting: the gap is the vanishing
            point, and a closed apex would read as a plain triangle. */}
        <path d="M2.6 21 L10.4 5.4" strokeWidth="2" />
        <path d="M21.4 21 L13.6 5.4" strokeWidth="2" />
        {/* Centre line, foreshortened as it recedes. */}
        <path d="M12 20.6 L12 17.4" strokeWidth="2" />
        <path d="M12 14.3 L12 12.7" strokeWidth="1.7" />
      </g>
    </svg>
  );
}
