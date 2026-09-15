import { Github, Linkedin } from 'lucide-react';
import type { TeamMember } from '../data/team';

interface TeamCardProps {
  member: TeamMember;
}

function initialsFor(name: string): string {
  const words = name.trim().split(/\s+/);
  return ((words[0]?.[0] ?? '') + (words[words.length - 1]?.[0] ?? '')).toUpperCase();
}

/** Team member card: photo (or monogram fallback) on top, bio and social links below. */
export function TeamCard({ member }: TeamCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-4xl border border-ast-line bg-ast-surface shadow-ast-card transition-[transform,border-color,box-shadow] duration-500 ease-ast-out hover:border-ast-brand/30 hover:shadow-ast-lifted motion-safe:hover:-translate-y-1.5">
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
            className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-ast-secondary to-ast-primary"
          >
            <div className="ast-grid absolute inset-0 opacity-70" />
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

        <div className="mt-5 flex items-center gap-2 border-t border-ast-line pt-5">
          {member.linkedinUrl ? (
            <a
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ast-line text-ast-ink-muted transition-colors duration-200 hocus:border-ast-brand/40 hocus:text-ast-brand"
            >
              <Linkedin className="h-4 w-4" aria-hidden />
            </a>
          ) : (
            <span
              aria-hidden
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ast-line text-ast-ink-muted/30"
            >
              <Linkedin className="h-4 w-4" />
            </span>
          )}
          {member.githubUrl ? (
            <a
              href={member.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on GitHub`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ast-line text-ast-ink-muted transition-colors duration-200 hocus:border-ast-brand/40 hocus:text-ast-brand"
            >
              <Github className="h-4 w-4" aria-hidden />
            </a>
          ) : (
            <span
              aria-hidden
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ast-line text-ast-ink-muted/30"
            >
              <Github className="h-4 w-4" />
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
