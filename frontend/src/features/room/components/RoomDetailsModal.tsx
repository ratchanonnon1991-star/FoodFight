import * as React from 'react';
import { CalendarDays, Clock3, MapPin, UsersRound } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import type { RoomLobby, UpdateRoomInput } from '../types/room-types';
import { formatRoomDate, formatRoomTime } from '../utils/room-format';
import { LocationPicker } from './LocationPicker';
import { RoomModal } from './RoomModal';

type RoomDetailsFormState = {
  name: string;
  maxMembers: string;
  locationName: string;
  latitude: number | null;
  longitude: number | null;
  searchRadiusKm: 1 | 3 | 5 | 10;
  date: string;
  time: string;
};

export function RoomDetailsModal({
  room,
  isHost,
  isSaving,
  error,
  onClose,
  onSave,
  onRequestClose,
}: {
  room: RoomLobby;
  isHost: boolean;
  isSaving: boolean;
  error: string | null;
  onClose: () => void;
  onSave: (input: UpdateRoomInput) => Promise<void>;
  onRequestClose: () => void;
}) {
  const [form, setForm] = React.useState<RoomDetailsFormState>(() =>
    getRoomDetailsForm(room),
  );
  const [validationError, setValidationError] = React.useState<string | null>(null);

  const updateForm = <K extends keyof RoomDetailsFormState>(
    field: K,
    value: RoomDetailsFormState[K],
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidationError(null);

    const name = form.name.trim();
    const locationName = form.locationName.trim();
    const maxMembers = Number(form.maxMembers);
    const scheduledAt = new Date(`${form.date}T${form.time}:00`);

    if (!name || name.length > 30) {
      setValidationError('Room name must be between 1 and 30 characters.');
      return;
    }

    if (!locationName) {
      setValidationError('Location is required.');
      return;
    }

    if (
      !Number.isInteger(maxMembers) ||
      maxMembers < room.memberCount ||
      maxMembers > 15
    ) {
      setValidationError(`Maximum members must be between ${room.memberCount} and 15.`);
      return;
    }

    if (Number.isNaN(scheduledAt.getTime())) {
      setValidationError('Select a valid date and time.');
      return;
    }

    await onSave({
      name,
      maxMembers,
      locationName,
      latitude: form.latitude,
      longitude: form.longitude,
      searchRadiusKm: form.searchRadiusKm,
      scheduledAt: scheduledAt.toISOString(),
    });
  };

  return (
    <RoomModal title="Room details" onClose={onClose}>
      {!isHost ? (
        <RoomDetailsReadOnly room={room} />
      ) : (
        <form onSubmit={submit} className="space-y-4" noValidate>
          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-text-primary">Room name</span>
            <Input
              value={form.name}
              maxLength={30}
              onChange={(event) => updateForm('name', event.target.value)}
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-text-primary">Max members</span>
            <Input
              type="number"
              min={room.memberCount}
              max={15}
              value={form.maxMembers}
              onChange={(event) => updateForm('maxMembers', event.target.value)}
            />
          </label>

          <div className="space-y-1.5">
            <span className="text-sm font-medium text-text-primary">Location</span>
            <LocationPicker
              id="room-details-location"
              value={form.locationName}
              latitude={form.latitude}
              longitude={form.longitude}
              onChange={(value) =>
                setForm((current) => ({
                  ...current,
                  locationName: value,
                  latitude: null,
                  longitude: null,
                }))
              }
              onPlaceSelected={({ locationName, latitude, longitude }) =>
                setForm((current) => ({
                  ...current,
                  locationName,
                  latitude,
                  longitude,
                }))
              }
              disabled={isSaving}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-text-primary">Search radius</span>
              <span className="text-xs text-text-secondary">Within {form.searchRadiusKm} km</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {[1, 3, 5, 10].map((radius) => (
                <button
                  key={radius}
                  type="button"
                  aria-pressed={form.searchRadiusKm === radius}
                  onClick={() =>
                    updateForm(
                      'searchRadiusKm',
                      radius as RoomDetailsFormState['searchRadiusKm'],
                    )
                  }
                  className={`h-10 rounded-lg border text-xs transition-colors ${form.searchRadiusKm === radius ? 'border-brand-primary bg-surface-subtle font-semibold' : 'border-border bg-surface hover:bg-surface-subtle'}`}
                >
                  {radius} km
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <label className="block space-y-1.5">
              <span className="text-sm font-medium text-text-primary">Date</span>
              <Input
                type="date"
                value={form.date}
                onChange={(event) => updateForm('date', event.target.value)}
              />
            </label>
            <label className="block space-y-1.5">
              <span className="text-sm font-medium text-text-primary">Time</span>
              <Input
                type="time"
                value={form.time}
                onChange={(event) => updateForm('time', event.target.value)}
              />
            </label>
          </div>

          {validationError || error ? (
            <p className="text-sm text-status-danger-text" role="alert">
              {validationError ?? error}
            </p>
          ) : null}

          <div className="flex gap-2 pt-1">
            <Button type="button" variant="outline" fullWidth disabled={isSaving} onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" fullWidth loading={isSaving}>
              Save changes
            </Button>
          </div>

          <div className="border-t border-border pt-4">
            <p className="font-semibold text-status-danger-text">Close room</p>
            <p className="mt-1 text-xs leading-relaxed text-text-secondary">
              Closing the room prevents anyone from joining it again.
            </p>
            <Button
              type="button"
              variant="destructive"
              fullWidth
              className="mt-3"
              onClick={onRequestClose}
            >
              Close room
            </Button>
          </div>
        </form>
      )}
    </RoomModal>
  );
}

function RoomDetailsReadOnly({ room }: { room: RoomLobby }) {
  return (
    <dl className="space-y-4">
      <div>
        <dt className="text-xs text-text-secondary">Room name</dt>
        <dd className="mt-1 font-semibold text-text-primary">{room.name}</dd>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <dt className="flex items-center gap-1.5 text-xs text-text-secondary">
            <UsersRound className="size-4" aria-hidden="true" /> Members
          </dt>
          <dd className="mt-1 font-medium text-text-primary">
            {room.memberCount} / {room.maxMembers}
          </dd>
        </div>
        <div>
          <dt className="flex items-center gap-1.5 text-xs text-text-secondary">
            <MapPin className="size-4" aria-hidden="true" /> Radius
          </dt>
          <dd className="mt-1 font-medium text-text-primary">Within {room.searchRadiusKm} km</dd>
        </div>
      </div>
      <div>
        <dt className="flex items-center gap-1.5 text-xs text-text-secondary">
          <MapPin className="size-4" aria-hidden="true" /> Location
        </dt>
        <dd className="mt-1 font-medium text-text-primary">{room.locationName}</dd>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <dt className="flex items-center gap-1.5 text-xs text-text-secondary">
            <CalendarDays className="size-4" aria-hidden="true" /> Date
          </dt>
          <dd className="mt-1 font-medium text-text-primary">{formatRoomDate(room.scheduledAt)}</dd>
        </div>
        <div>
          <dt className="flex items-center gap-1.5 text-xs text-text-secondary">
            <Clock3 className="size-4" aria-hidden="true" /> Time
          </dt>
          <dd className="mt-1 font-medium text-text-primary">{formatRoomTime(room.scheduledAt)}</dd>
        </div>
      </div>
    </dl>
  );
}

function getRoomDetailsForm(room: RoomLobby): RoomDetailsFormState {
  const scheduledAt = new Date(room.scheduledAt);

  return {
    name: room.name,
    maxMembers: String(room.maxMembers),
    locationName: room.locationName,
    latitude: room.latitude ?? null,
    longitude: room.longitude ?? null,
    searchRadiusKm: room.searchRadiusKm as RoomDetailsFormState['searchRadiusKm'],
    date: formatDateInput(scheduledAt),
    time: formatTimeInput(scheduledAt),
  };
}

function formatDateInput(date: Date) {
  if (Number.isNaN(date.getTime())) return '';
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function formatTimeInput(date: Date) {
  if (Number.isNaN(date.getTime())) return '';
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}
