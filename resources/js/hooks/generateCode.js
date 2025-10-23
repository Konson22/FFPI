export const generateCode = (ticket) => {
    const UPPERCASELATTERS = 'QWERTYUIOPASDFGHJKLZXCVBNM';
    const NUMBERS = '1234567890';
    return `${ticket.id}-${UPPERCASELATTERS[Math.round(Math.random() * 24 )]}${UPPERCASELATTERS[Math.round(Math.random() * 24 )]}-${ticket.number_of_tickets}${NUMBERS[Math.round(Math.random() * 9 )]}${NUMBERS[Math.round(Math.random() * 9 )]}${NUMBERS[Math.round(Math.random() * 9 )]}`;
};
