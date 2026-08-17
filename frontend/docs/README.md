# FoodFighter Frontend Design-System Governance Pack

This pack is intended to be copied into:

```text
C:\devnest 101\FoodFight\frontend
```

It defines the working contract for the `feature/frontend-design-system` branch.

## Canonical read order

1. `AGENTS.md`
2. `docs/Srs-Footfight.md` — existing project SRS, not included in this pack
3. `docs/FRONTEND.md` — existing frontend spec, not included in this pack
4. `docs/FRONTEND_FILE_MAP.md`
5. `docs/FRONTEND_DESIGN_SYSTEM_MASTER.md`
6. `docs/COLOR_SYSTEM.md`
7. `docs/MOTION_SYSTEM.md`
8. `docs/COMPONENT_CATALOG.md`
9. `docs/FRONTEND_SKILLS.md`
10. `agents/frontend-design-system-agent.md`
11. `skills/foodfighter-frontend-design-system/SKILL.md`

## Branch

Create the branch only if it does not exist:

```powershell
git branch --list feature/frontend-design-system
git switch -c feature/frontend-design-system
```

If it already exists:

```powershell
git switch feature/frontend-design-system
```

## Important

- This pack does not replace the SRS.
- Product requirements come from `docs/Srs-Footfight.md`.
- Brand colors below are owner-approved palette inputs.
- Implementation details must be verified against the actual installed Next.js/Tailwind versions before editing configuration.
