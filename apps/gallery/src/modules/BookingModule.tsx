import { useState } from 'react';
import { Alert, Badge, Button, DatePicker, Fieldset, Icon, List, Select } from '@bricks/core';
const times = ['09:00', '10:30', '13:00', '14:30', '16:00'];
type Reservation = { id: string; day: string; time: string; room: string };
export function BookingModule() {
  const [today] = useState(() => {
    const day = new Date();
    day.setHours(0, 0, 0, 0);
    return day;
  });
  const [date, setDate] = useState<Date | null>(today);
  const [room, setRoom] = useState('스튜디오 A');
  const [time, setTime] = useState('09:00');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [message, setMessage] = useState('');
  const day = date?.toLocaleDateString('ko-KR') ?? '';
  const booked = (slot: string) =>
    reservations.some((item) => item.day === day && item.room === room && item.time === slot);
  return (
    <>
      <div className="module-row">
        <Badge variant="outline">60분 미팅</Badge>
        <span className="module-small">최대 6명</span>
      </div>
      <Fieldset legend="예약 날짜">
        <DatePicker
          value={date}
          minDate={today}
          onChange={(value) => {
            setDate(value);
            setMessage('');
          }}
          placeholder="예약 날짜 선택"
          className="w-full"
          size="sm"
        />
      </Fieldset>
      <Fieldset legend="회의실">
        <Select
          size="sm"
          className="w-full"
          aria-label="예약 회의실"
          value={room}
          onChange={(event) => {
            setRoom(event.target.value);
            setMessage('');
          }}
          options={['스튜디오 A', '스튜디오 B'].map((value) => ({ value, label: value }))}
        />
      </Fieldset>
      <Fieldset legend="시작 시간">
        <div className="module-time-slots">
          {times.map((slot) => (
            <Button
              key={slot}
              size="sm"
              color={time === slot ? 'primary' : undefined}
              variant={time === slot ? 'solid' : 'surface'}
              aria-pressed={time === slot}
              disabled={booked(slot)}
              onClick={() => {
                setTime(slot);
                setMessage('');
              }}
            >
              {slot}
            </Button>
          ))}
        </div>
      </Fieldset>
      <Button
        color="primary"
        size="sm"
        disabled={!date || date < today || booked(time)}
        onClick={() => {
          setReservations((current) => [...current, { id: crypto.randomUUID(), day, time, room }]);
          setMessage(`${day} ${time} · ${room} 예약을 추가했습니다.`);
        }}
      >
        <Icon name="calendar" size={16} />
        예약 추가
      </Button>
      {message && <Alert color="success" description={message} />}
      {!!reservations.length && (
        <List
          aria-label="예약 목록"
          items={reservations.map((item) => ({
            id: item.id,
            content: (
              <div className="module-member">
                <strong>{item.room}</strong>
                <span className="module-small">
                  {item.day} {item.time}
                </span>
              </div>
            ),
            trailing: (
              <Button
                size="xs"
                variant="ghost"
                aria-label={`${item.room} ${item.time} 예약 취소`}
                onClick={() => {
                  setReservations((current) => current.filter((entry) => entry.id !== item.id));
                  setMessage('예약을 취소했습니다.');
                }}
              >
                취소
              </Button>
            ),
          }))}
        />
      )}
    </>
  );
}
