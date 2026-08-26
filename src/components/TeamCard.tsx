import type { TeamMember } from '../data/team';

interface TeamCardProps {
  member: TeamMember;
}

function initialsFor(name: string): string {
  const words = name.trim().split(/\s+/);
  return ((words[0]?.[0] ?? '') + (words[words.length - 1]?.[0] ?? '')).toUpperCase();
}

/** Team member card: photo (or monogram fallback) on top, bio below. */
export function TeamCard({ member }: TeamCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-4xl border border-ast-line bg-ast-surface/60 transition-[transform,border-color,box-shadow] duration-500 ease-ast-out hover:border-ast-brand/30 hover:shadow-ast-lifted motion-safe:hover:-translate-y-1.5">
      <div className="relative aspect-[4/5] overflow-hidden">
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name}
            className={`h-full w-full object-cover transition-transform duration-700 ease-ast-out motion-safe:group-hover:scale-105 ${
              member.photoPosition === 'top' ? 'object-top' : 'object-center'
            }`}
          />
        ) : (
          <div
            aria-hidden
            className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-ast-secondary via-ast-primary to-ast-canvas"
          >
            <div className="ast-grid absolute inset-0 opacity-70" />
            <div className="absolute -right-8 -top-8 h-2/3 w-2/3 rounded-full bg-ast-accent/25 blur-3xl transition-transform duration-700 ease-ast-out motion-safe:group-hover:scale-125" />
            <span className="relative text-4xl font-semibold tracking-tighter2 text-white/90">
              {initialsFor(member.name)}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-semibold tracking-tighter2">{member.name}</h3>
        <p className="mt-1 text-sm font-medium text-ast-accent">{member.role}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ast-ink-muted">{member.bio}</p>
      </div>
    </article>
  );
}
