const getSheets = () => SpreadsheetApp.getActive().getSheets();

const getActiveSheetName = () => SpreadsheetApp.getActive().getSheetName();

export const getSheetsData = () => {
  const activeSheetName = getActiveSheetName();
  return getSheets().map((sheet, index) => {
    const name = sheet.getName();
    return {
      name,
      index,
      isActive: name === activeSheetName,
    };
  });
};

export const addSheet = (sheetTitle: string) => {
  SpreadsheetApp.getActive().insertSheet(sheetTitle);
  return getSheetsData();
};

export const deleteSheet = (sheetIndex: number) => {
  const sheets = getSheets();
  SpreadsheetApp.getActive().deleteSheet(sheets[sheetIndex]);
  return getSheetsData();
};

export const setActiveSheet = (sheetName: string) => {
  SpreadsheetApp.getActive().getSheetByName(sheetName).activate();
  return getSheetsData();
};

interface CompanyInfo {
  korName: String
  engName: String
  orgType: String
  representative: String
  attendee: String
  email1: String
  email2: String
  web: String
  address: String
  korSummary: String
  engSummary: String
  description: String
  productSummary: String
  productDescription: String
}

export const getData = () => {
  const sheet = SpreadsheetApp
    .openById('18wxZBD3ZufJk2A-DOl8S2-xjk92AROGLePu1du9c3Ho')
    .getSheetByName('셀러정보');

  const values = sheet
    .getDataRange()
    .getValues()
    .filter((row, _, __) => {
      const filtered = row.filter((cell, _, __) => {
        return cell
    });

    return filtered.length > 0;
  });

  var columnIndex = new Map<String, number>();

  values[0]
    .forEach((value: String, colIndex, _) => {
      columnIndex.set(value.trim(), colIndex);
    });

  const data = values.slice(1);

  const idxKorName = columnIndex.get('회사명(국문)');
  const idxEngName = columnIndex.get('회사명(영문)');
  const idxOrgType = columnIndex.get('기관유형');
  const idxRepresentative = columnIndex.get('대표자명');
  const idxAttendee = columnIndex.get('참가자명');
  const idxEmail1 = columnIndex.get('이메일1');
  const idxEmail2 = columnIndex.get('이메일2');
  const idxWeb = columnIndex.get('홈페이지');
  const idxAddress = columnIndex.get('주소');
  const idxKorSummary = columnIndex.get('한줄 회사 소개');
  const idxEngSummary = columnIndex.get('영어 한줄 회사 소개');
  const idxDescription = columnIndex.get('회사소개');
  const idxProductSummary = columnIndex.get('상품 내용');
  const idxProductDescription = columnIndex.get('상품소개');

  const allCompanyInfo = data.map((row, _, __) => {
    var info = {} as CompanyInfo;

    if (idxKorName !== undefined) {
      info.korName = row[idxKorName];
    }

    if (idxEngName !== undefined) {
      info.engName = row[idxEngName];
    }

    if (idxOrgType !== undefined) {
      info.orgType = row[idxOrgType];
    }

    if (idxRepresentative !== undefined) {
      info.representative = row[idxRepresentative];
    }

    if (idxAttendee !== undefined) {
      info.attendee = row[idxAttendee];
    }

    if (idxEmail1 !== undefined) {
      info.email1 = row[idxEmail1];
    }

    if (idxEmail2 !== undefined) {
      info.email2 = row[idxEmail2];
    }

    if (idxWeb !== undefined) {
      info.web = row[idxWeb];
    }

    if (idxAddress !== undefined) {
      info.address = row[idxAddress];
    }

    if (idxKorSummary !== undefined) {
      info.korSummary = row[idxKorSummary];
    }

    if (idxEngSummary !== undefined) {
      info.engSummary = row[idxEngSummary];
    }

    if (idxDescription !== undefined) {
      info.description = row[idxDescription];
    }

    if (idxProductSummary !== undefined) {
      info.productSummary = row[idxProductSummary];
    }

    if (idxProductDescription !== undefined) {
      info.productDescription = row[idxProductDescription];
    }

    return info;
  });

  return allCompanyInfo;
};