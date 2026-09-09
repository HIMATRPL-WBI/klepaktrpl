-- Adds idle_background_brightness to settings table (default 85%)
-- Controls the photo opacity and brightness of the idle screen background.
alter table settings
  add column if not exists idle_background_brightness integer not null default 85;
