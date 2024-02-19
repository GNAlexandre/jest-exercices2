//Modification de la classe isValidDate pour qu'elle accepte les dates au format YYYY-MM-DD
export const isValidDate = date =>
    date !== null && date !== undefined && !isNaN(Date.parse(date));



export const formatDate = (date = '01/01/1970', locale = 'fr-FR', options) =>
  date === ''
    ? ''
    : new Intl.DateTimeFormat(locale, options).format(new Date(date));

export const setDate = ({
  date,
  formatDateFn = formatDate,
  isValidDateFn = isValidDate,
}) => (isValidDateFn(date) ? formatDateFn(date) : '');
