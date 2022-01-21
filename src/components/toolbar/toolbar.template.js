function toButton(button) {
  return `
    <div
      class="button${button.acive ? ' active' : ''}"
      data-type="button"
      data-value='${JSON.stringify(button.value)}'>
      <span class="material-icons">
          ${button.icon}
      </span>
    </div>
  `;
}

export default function createToolbar(state) {
  const buttons = [
    {
      icon: 'format_align_left',
      acive: state.textAlign === 'left',
      value: { textAlign: 'left' },
    },
    {
      icon: 'format_align_center',
      acive: state.textAlign === 'center',
      value: { textAlign: 'center' },
    },
    {
      icon: 'format_align_right',
      acive: state.textAlign === 'right',
      value: { textAlign: 'right' },
    },
    {
      icon: 'format_bold',
      acive: state.fontWeight === 'bold',
      value: { fontWeight: state.fontWeight === 'bold' ? 'normal' : 'bold' },
    },
    {
      icon: 'format_italic',
      acive: state.fontStyle === 'italic',
      value: { fontStyle: state.fontStyle === 'italic' ? 'normal' : 'italic' },
    },
    {
      icon: 'format_underlined',
      acive: state.textDecoration === 'underline',
      value: {
        textDecoration:
          state.textDecoration === 'underline' ? 'none' : 'underline',
      },
    },
  ];
  return buttons.map(toButton).join('');
}
