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
  isSeller: Boolean
  country: String
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

export const spreadsheet = () => {
  return SpreadsheetApp
    .openById('18KMesRalkDJZD8-htmwAlwvS8sMbHnluI1wd0KxwrLU');
};

export const getData = () => {
  const sellerCompanySheet = spreadsheet()
    .getSheetByName('셀러정보');

  const buyerCompanySheet = spreadsheet()
    .getSheetByName('바이어정보');

  const sellerValues = sellerCompanySheet
    .getDataRange()
    .getValues()
    .filter((row, _, __) => {
      const filtered = row.filter((cell, _, __) => {
        return cell
    });

    return filtered.length > 0;
  });

  const buyerValues = buyerCompanySheet
    .getDataRange()
    .getValues()
    .filter((row, _, __) => {
      const filtered = row.filter((cell, _, __) => {
        return cell
      });

      return filtered.length > 0;
    });

  var sellerColumnIndex = new Map<String, number>();
  var buyerColumnIndex = new Map<String, number>();

  sellerValues[0]
    .forEach((value: String, colIndex, _) => {
      sellerColumnIndex.set(value.trim(), colIndex);
    });

  buyerValues[0]
    .forEach((value: String, colIndex, _) => {
      buyerColumnIndex.set(value.trim(), colIndex);
    });

  const sellerData = sellerValues.slice(1);
  const buyerData = buyerValues.slice(1);

  const idxKorName = sellerColumnIndex.get('회사명(국문)');
  const idxEngName = sellerColumnIndex.get('회사명(영문)');
  const idxOrgType = sellerColumnIndex.get('기관유형');
  const idxRepresentative = sellerColumnIndex.get('대표자명');
  const idxAttendee = sellerColumnIndex.get('참가자명');
  const idxEmail1 = sellerColumnIndex.get('이메일1');
  const idxEmail2 = sellerColumnIndex.get('이메일2');
  const idxWeb = sellerColumnIndex.get('홈페이지');
  const idxAddress = sellerColumnIndex.get('주소');
  const idxKorSummary = sellerColumnIndex.get('한줄 회사 소개');
  const idxEngSummary = sellerColumnIndex.get('영어 한줄 회사 소개');
  const idxDescription = sellerColumnIndex.get('회사소개');
  const idxProductSummary = sellerColumnIndex.get('상품 내용');
  const idxProductDescription = sellerColumnIndex.get('상품소개');

  const idxCountry = buyerColumnIndex.get('Country');
  const engIdxKorName = buyerColumnIndex.get('회사 이름');
  const engIdxEngName = buyerColumnIndex.get('Company name');
  const engIdxRepresentative = buyerColumnIndex.get('대표자');
  const engIdxAttendee = buyerColumnIndex.get('Participant');
  const engIdxEmail1 = buyerColumnIndex.get('E-Mail');
  const engIdxWeb = buyerColumnIndex.get('Website');
  const engIdxEngSummary = buyerColumnIndex.get('Company Profile');

  const allSellers = sellerData.map((row, _, __) => {
    var info = {} as CompanyInfo;

    info.isSeller = true;
    info.country = 'Republic of Korea';

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

  const allBuyers = buyerData.map((row, _, __) => {
    var info = {} as CompanyInfo;

    info.isSeller = false;
    info.orgType = "";
    info.email2 = "";
    info.address = "";
    info.korSummary = "";
    info.description = "";
    info.productSummary = "";
    info.productDescription = "";
    
    if (idxCountry !== undefined) {
      info.country = row[idxCountry];
    }

    if (engIdxKorName !== undefined) {
      info.korName = row[engIdxKorName];
    }

    if (engIdxEngName !== undefined) {
      info.engName = row[engIdxEngName];
    }

    if (engIdxRepresentative !== undefined) {
      info.representative = row[engIdxRepresentative];
    }

    if (engIdxAttendee !== undefined) {
      info.attendee = row[engIdxAttendee];
    }

    if (engIdxEmail1 !== undefined) {
      info.email1 = row[engIdxEmail1];
    }

    if (engIdxWeb !== undefined) {
      info.web = row[engIdxWeb];
    }

    if (engIdxEngSummary !== undefined) {
      info.engSummary = row[engIdxEngSummary];
    }

    return info;
  });

  const allCompanies = allSellers
    .concat(allBuyers).filter((info, _, __) => {
      return info.engName;
    });

  return allCompanies;
};

interface Schedule {
  associatedTime: String
  buyer: CompanyInfo
  seller: CompanyInfo
  slot: number
}

export const getAllSchedules = () => {
  const scheduleSheet = spreadsheet()
    .getSheetByName('Schedule');

  const rows = scheduleSheet
    .getDataRange()
    .getValues();

  let timeIndex = 0;

  const allCompanyInfo = getData();

  let latestTime: String = '';
  let buyersAtThatTime: CompanyInfo[] | undefined = undefined;
  let sellersAtThatTime: CompanyInfo[] | undefined = undefined;

  let schedules: Schedule[] = [];

  rows.slice(1).forEach((row, _, __) => {
    row.forEach((cell: String, columnIndex, _) => {
      if (columnIndex === timeIndex) {
        if (cell) {
          // Make schedules from the previous iterations
          let index = 0;
          while (buyersAtThatTime !== undefined &&
                 sellersAtThatTime !== undefined &&
                 latestTime) {
            if (buyersAtThatTime[index] || sellersAtThatTime[index]) {
              let schedule = {} as Schedule;
              schedule.slot = index + 1;
              schedule.associatedTime = latestTime;
              schedule.buyer = buyersAtThatTime[index] ?? '';
              schedule.seller = sellersAtThatTime[index] ?? '';
              schedules.push(schedule);
            }

            index += 1;

            if (index === buyersAtThatTime.length || index === sellersAtThatTime.length) {
              buyersAtThatTime = undefined;
              sellersAtThatTime = undefined;
              latestTime = '';
              index = 0;
            }
          }

          latestTime = cell;
        }
      } else if (cell === 'BUYER') {
        buyersAtThatTime = [];
      } else if (cell === 'SELLER') {
        sellersAtThatTime = [];
      } else {
        const company = allCompanyInfo.filter((info, _, __) => {
          return info.engName === cell || info.korName === cell;
        })[0];

        if (sellersAtThatTime !== undefined) {
          sellersAtThatTime.push(company);
        } else if (buyersAtThatTime !== undefined) {
          buyersAtThatTime.push(company);
        }
      }
    });
  });

  return schedules;
}

export const getAllSchedulesForSlot = (slotNumber: number) => {
  return getAllSchedules().filter((schedule, _, __) => {
    return schedule.slot === slotNumber;
  });
}

export const getAllAssociatedSchedules = (info: CompanyInfo) => {
  const allSchedules = getAllSchedules();

  return allSchedules.filter((schedule, _, __) => {
    return schedule.buyer.engName === info.engName || schedule.seller.engName === info.engName;
  });
}

export const getAllAssociatedSchedulesForName = (name: String) => {
  const allCompanies = getData();

  const company = allCompanies.filter((info, _, __) => {
    return info.engName === name || info.korName === name;
  })[0];

  if (company === undefined) {
    return [];
  }

  return getAllAssociatedSchedules(company);
}

export const getAllSlots = () => {
  let values = spreadsheet()
    .getSheetByName('Schedule')
    .getDataRange()
    .getValues();

  const columns = values[0];
  return columns.filter((value: String, _, __) => {
    return value && value.includes('SLOT');
  }).map((value: String, _, __) => {
    const raw = value.split('SLOT');
    const slotNumber = Number(raw[raw.length - 1]);
    return slotNumber;
  });
}