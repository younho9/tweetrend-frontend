import { createPrevDate } from 'src/utils';

export const NOW = new Date();

export const YESTERDAY = createPrevDate(NOW, 1);

export const THISWEEK = createPrevDate(NOW, 7);

export const THISMONTH = createPrevDate(NOW, 30);

export const THREEMONTH = createPrevDate(NOW, 90);
