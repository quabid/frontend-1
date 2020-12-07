export const cap = (arg = '') => {
  let line = '';
  // Check dash
  if (arg.includes('-')) {
    const dash = arg.split('-');
    dash.map((d, ind) => {
      if (ind < dash.length - 1) {
        line += `${d.substring(0, 1).toUpperCase()} ${d.substring(1)} `;
      } else {
        line += `${d.substring(0, 1).toUpperCase()} ${d.substring(1)}`;
      }
      return line;
    });
  } else if (arg.includes(' ')) {
    // Check space
    const dash = arg.split(' ');
    dash.map((d, ind) => {
      if (ind < dash.length - 1) {
        line += `${d.substring(0, 1).toUpperCase()} ${d.substring(1)} `;
      } else {
        line += `${d.substring(0, 1).toUpperCase()} ${d.substring(1)}`;
      }
      return line;
    });
  } else if (arg.includes(',')) {
    // Check comma
    const dash = arg.split(',');
    dash.map((d, ind) => {
      if (ind < dash.length - 1) {
        line += `${d.substring(0, 1).toUpperCase()} ${d.substring(1)} `;
      } else {
        line += `${d.substring(0, 1).toUpperCase()} ${d.substring(1)}`;
      }
      return line;
    });
  } else if (arg.includes('.')) {
    // Check period
    const dash = arg.split('.');
    dash.map((d, ind) => {
      if (ind < dash.length - 1) {
        line += `${d.substring(0, 1).toUpperCase()} ${d.substring(1)} `;
      } else {
        line += `${d.substring(0, 1).toUpperCase()} ${d.substring(1)}`;
      }
      return line;
    });
  }

  return arg.substring(0, 1).toUpperCase() + arg.substring(1);
};
