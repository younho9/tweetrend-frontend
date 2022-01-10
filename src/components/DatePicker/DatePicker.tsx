import { useRef } from 'react';
import { Modifier } from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils from 'react-day-picker/moment';
import styled from 'styled-components';

import Icon from 'src/components/Icon';
import { usePeriod } from 'src/contexts';
import { hexToRGBA, typography } from 'src/styles';

import 'react-day-picker/lib/style.css';

export type DatePickerProps = Record<string, unknown> &
  Partial<StyledDatePickerProps>;

export type StyledDatePickerProps = {
  /** HTML 클래스 속성 */
  className?: string;
};

const StyledDatePicker = styled.div<StyledDatePickerProps>`
  display: inline-flex;
  align-items: center;

  & .divider {
    margin: 0 10px;
    color: ${({ theme }) => theme.colors.Gray700};
  }
`;

const DayPickerInputWithIcon = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.Gray400};
  background-color: ${({ theme }) => theme.colors.Gray75};
  border-radius: 4px;
  height: 2rem;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;

  & label {
    padding: 3px;
  }

  & .DayPickerInput {
    width: 150px;

    .DayPicker-wrapper {
      background-color: ${({ theme }) => theme.colors.Gray50};
      color: ${({ theme }) => theme.colors.Gray900};
    }
    .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
      background-color: ${({ theme }) =>
        hexToRGBA(theme.colors.Blue400, 0.3)} !important;
      color: ${({ theme }) => theme.colors.Gray800};
    }
    .DayPicker-Day {
      border-radius: 0 !important;
    }
    .DayPicker-Day--start {
      border-top-left-radius: 50% !important;
      border-bottom-left-radius: 50% !important;
    }
    .DayPicker-Day--end {
      border-top-right-radius: 50% !important;
      border-bottom-right-radius: 50% !important;
    }
    .DayPicker-Weekday {
      color: ${({ theme }) => theme.colors.Gray600};
    }
    .DayPicker-Day--today {
      color: ${({ theme }) => theme.colors.Red400};
    }
    .DayPicker-Day--disabled {
      color: ${({ theme }) => theme.colors.Gray200};
    }

    & input {
      box-sizing: border-box;
      width: 100%;
      box-sizing: border-box;
      min-height: 1.875rem;
      margin: 0;
      padding: 0;
      border: none;
      font-size: ${typography.size.s2};
      border-radius: 4px;
      background-color: transparent;
      color: ${({ theme }) => theme.colors.Gray600};
      font-weight: ${({ theme }) => theme.typography.weight.bold};
      text-indent: 6px;
    }
  }
`;

function DatePicker(props: DatePickerProps) {
  const { period, setFromTo } = usePeriod();
  const { from, to } = period;
  const toRef = useRef<DayPickerInput>(null);
  const modifiers = { start: from, end: to };

  const handleFromChange = (newFrom: Date) => setFromTo(newFrom, to);
  const handleToChange = (newTo: Date) => setFromTo(from, newTo);

  return (
    <StyledDatePicker {...props}>
      <DayPickerInputWithIcon>
        <Icon icon="CalendarOutline" as="label" size={18} color="Gray700" />
        <DayPickerInput
          value={from}
          placeholder="시작일"
          format="LL"
          formatDate={MomentLocaleUtils.formatDate}
          parseDate={MomentLocaleUtils.parseDate}
          dayPickerProps={{
            selectedDays: [from, { from, to }] as Modifier[],
            disabledDays: { after: to } as Modifier,
            toMonth: to,
            modifiers,
            numberOfMonths: 1,
            localeUtils: MomentLocaleUtils,
            locale: 'ko',
            onDayClick: () => toRef.current?.getInput().focus(),
          }}
          onDayChange={handleFromChange}
        />
      </DayPickerInputWithIcon>
      <div className="divider">-</div>
      <DayPickerInputWithIcon>
        <Icon icon="CalendarOutline" as="label" size={18} color="Gray700" />
        <DayPickerInput
          ref={toRef}
          value={to}
          placeholder="종료일"
          format="LL"
          formatDate={MomentLocaleUtils.formatDate}
          parseDate={MomentLocaleUtils.parseDate}
          dayPickerProps={{
            selectedDays: [from, { from, to }] as Modifier[],
            disabledDays: { before: from } as Modifier,
            modifiers,
            month: from,
            fromMonth: from,
            numberOfMonths: 1,
            localeUtils: MomentLocaleUtils,
            locale: 'ko',
          }}
          onDayChange={handleToChange}
        />
      </DayPickerInputWithIcon>
    </StyledDatePicker>
  );
}

export default DatePicker;
