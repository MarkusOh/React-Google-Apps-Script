export const onOpen = () => {
  const menu = SpreadsheetApp.getUi()
    .createMenu('Auto Scheduler')
    .addItem('Schedule Maker', 'openDialogTailwindCSS')

  menu.addToUi();
};

export const openDialogTailwindCSS = () => {
  const html = HtmlService.createHtmlOutputFromFile('dialog-demo-tailwindcss')
    .setWidth(800)
    .setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(html, 'Schedule Maker');
};