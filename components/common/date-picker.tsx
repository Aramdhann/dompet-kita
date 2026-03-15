import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

// ── Reusable: Date Picker ────────────────────────────────────
export function DatePicker({
  value,
  onChange,
}: {
  value?: Date;
  onChange: (d?: Date) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start h-12 font-normal text-gray-600"
        >
          <CalendarIcon className="mr-2 w-4 h-4 text-gray-400" />
          {value
            ? format(value, 'dd MMMM yyyy', { locale: id })
            : 'Pilih tanggal'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          locale={id}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
}
