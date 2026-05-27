// 시트별 컬럼 매핑 (0-based 인덱스)
// 회계용/행정용 두 시트 모두 raw 지출 내역을 담지만 컬럼 구조가 다름
const SHEET_COLUMNS = {
  accounting: { sheetName: '회계용', cat: 0, date: 1, desc: 2, amount: 3, income: 4, fund: 5 },
  admin:      { sheetName: '행정용', cat: 0, date: 1, desc: 6, amount: 7, income: 8, fund: 5 }
};

// 부서별 스프레드시트 설정 (순서 정렬됨)
const DEPARTMENTS = {
  // 예배/찬양
  '예배사역통합': {
    category: '예배/찬양',
    spreadsheetId: '1_989wCvweFXlTMGgeVHTF1bi7hYxbLoTTdbwEtKQJUU',
    sheetName: '회계용',
    categories: ['봉사자식대', '물품구입비', '장비유지보수', '시스템신규교체', '무대디자인', '자부담수입']
  },
  '찬양사역통합': {
    category: '예배/찬양',
    spreadsheetId: '1Axc43x74X6p8N8gnUzdKiPlTJBaUd06eXjU6xA8Jo88',
    sheetName: '회계용',
    categories: ['봉사자식대', '물품구입비', '부서운영비', '스텝/교사 교육비', '찬양팀 교육훈련비', '찬양음원제작비', '선물비', '자부담수입']
  },
  '2부찬양팀': {
    category: '예배/찬양',
    spreadsheetId: '1SVrorij3jwO2Vd7SjAwBrILosZU-A79zr_3XCAfUl1Y',
    sheetName: '회계용',
    categories: ['봉사자식대', '스텝/교사 교육비', '자부담수입']
  },
  '3부찬양팀': {
    category: '예배/찬양',
    spreadsheetId: '1t7JhWiS0nzTmxJNmPYIdd7-DuGaqc2u4nf0qIH2ASb8',
    sheetName: '회계용',
    categories: ['봉사자식대', '오디션', '자부담수입']
  },
  '수요기도회': {
    category: '예배/찬양',
    spreadsheetId: '1LSWWrRxpeUCno53g_POIHZVd0umnyPqo428b2d5K3gc',
    sheetName: '회계용',
    categories: ['봉사자식대', '월례회', '자부담수입']
  },
  '금요기도회': {
    category: '예배/찬양',
    spreadsheetId: '148aIUc4EQyQ27RrxiWAw6qDmRLIusDD02HyVE-aj-G0',
    sheetName: '회계용',
    categories: ['봉사자식대', '부서운영비', '외부강사비', '자부담수입']
  },
  
  // 초장/장년
  '푸른초장': {
    category: '초장/장년',
    spreadsheetId: '13FJ4y59dMggxXyMAXj0Ohprduj6B3nZ7YSHh_po2Tck',
    sheetName: '회계용',
    categories: ['인쇄비', '선물비', '부서운영비', '경조사비', '지역심방비', '목자모임', '교재비', '워크샵', '신혼초장', '싱글공동체(하랑)', '초장목자모임', '초장지원비', '자부담수입']
  },
  '에벤에셀': {
    category: '초장/장년',
    spreadsheetId: '1FpOAbiJp9vFxPDcawhTlDXIbQ7qcosq2DbwIWRBggbo',
    sheetName: '회계용',
    categories: ['엠티비', '부서운영비', '월례회', '세미나', '자부담수입']
  },
  '교육훈련부': {
    category: '초장/장년',
    spreadsheetId: '17Vu6rxRUkptD0uvhNYYGB9jEqGFdG9qZ7zeLP6Jv9FA',
    sheetName: '회계용',
    categories: ['인쇄비', '하세나', '물품구입비', '부서운영비', '교재비', '스텝/교사 교육비', '제자훈련', '세례교육', '바이블교육', '교육특강', '재정교실', '가정사역', '자부담수입']
  },
  '중보기도사역부': {
    category: '초장/장년',
    spreadsheetId: '1Db_PYh4mGswul3QIHz6G7JPn0DB4Dnd5xj4Y5NG32OM',
    sheetName: '회계용',
    categories: ['물품구입비', '부서운영비', '월례회', '연합모임', '중보기도학교', '중보기도세미나', '자부담수입']
  },
  '장년새가족': {
    category: '초장/장년',
    spreadsheetId: '1gTCranwHroYi-F7Y-wvJYa5JumSJQnL92Q2ijBE23S4',
    sheetName: '회계용',
    categories: ['인쇄비', '물품구입비', '부서운영비', '새가족다과비', '등록선물', '자부담수입']
  },
  '예배안내1부': {
    category: '초장/장년',
    spreadsheetId: '1XndgF32Bc2BdXleapPllzjb0RA1bYhgrMzJqDlpHTJ4',
    sheetName: '회계용',
    categories: ['봉사자식대', '물품구입비', '부서운영비', '자부담수입']
  },
  '예배안내2부': {
    category: '초장/장년',
    spreadsheetId: '1gxG-KlPe5cprZkVcWILJACXjaHDCtiDggTgmal60v38',
    sheetName: '회계용',
    categories: ['봉사자식대', '물품구입비', '부서운영비', '자부담수입']
  },
  '친교봉사부': {
    category: '초장/장년',
    spreadsheetId: '1_ODUtM69v21wOrxRM2UvztJTC3N91t-mEs0h8zh7s-c',
    sheetName: '회계용',
    categories: ['봉사자식대', '물품구입비', '부서운영비', '티테이블', '자부담수입']
  },
  '솔리데오찬양대': {
    category: '초장/장년',
    spreadsheetId: '1VrNbHmEyRB9YA7gOufGKwt2_VEo3WYq95fBThI5u51w',
    sheetName: '회계용',
    categories: ['부서운영비', '물품구입비', '악보구입', '앙상블월례회', '임원월례회', '초청연주자', '자부담수입']
  },
  '차량안내부': {
    category: '초장/장년',
    spreadsheetId: '1hkdf6kSuQR2qA7wxe18-TvTvimsPb7DvWQy8TxDyeHQ',
    sheetName: '회계용',
    categories: ['봉사자식대', '엠티비', '물품구입비', '월례회', '자부담수입']
  },
  '상례부': {
    category: '초장/장년',
    spreadsheetId: '1hjW2elicG7hkuJBUTlPY9H8ubn7HEW0Pmh3EzYWySIQ',
    sheetName: '회계용',
    categories: ['부서운영비', '조의금', '조화대', '상례부 교통비', '자부담수입']
  },
  
  // 차세대
  '차세대통합': {
    category: '차세대',
    spreadsheetId: '1kaQ6c_lz5ROowtKWOx8GxVdEwqUyB-v0h8kn3j-jnO0',
    sheetName: '회계용',
    categories: ['부서운영비', '물품구입비', '회의비', '스텝/교사 교육비', '수능기도회', '통합훈련', '교사대학', '온라인예배', '어린이주일', '올데이차세대', '자부담수입']
  },
  '영아1부': {
    category: '차세대',
    spreadsheetId: '129Trfdpwe6SwuF6K55eYaYIr-x8xtEriG3mKA0UdHdo',
    sheetName: '회계용',
    categories: ['선물비', '봉사자식대', '물품구입비', '학생식대/간식', '교사선물비', '월례회', '절기예배', '교육활동비', '스텝/교사 교육비', '부모모임', '예함', '자부담수입']
  },
  '영아2부': {
    category: '차세대',
    spreadsheetId: '18RsXt4g2qO_iGHhkjLfSTbqH93bwcTl9qa6NuGgDARM',
    sheetName: '회계용',
    categories: ['선물비', '봉사자식대', '물품구입비', '학생식대/간식', '교사선물비', '월례회', '절기예배', '교육활동비', '스텝/교사 교육비', '부모모임', '예함', '자부담수입']
  },
  '유아1부': {
    category: '차세대',
    spreadsheetId: '1KPocuyYHJJug73T-DxFq7N0Ini1B6YFDPWIe_V5Roiw',
    sheetName: '회계용',
    categories: ['선물비', '봉사자식대', '물품구입비', '학생식대/간식', '교사선물비', '심방비', '월례회', '절기예배', '교육활동비', '교재비', '스텝/교사 교육비', '부모모임', '예함', '자부담수입']
  },
  '유아2부': {
    category: '차세대',
    spreadsheetId: '1i8AyVChr838UmsrI49BaIgipBXlscuvL44OTVYBkIQU',
    sheetName: '회계용',
    categories: ['선물비', '봉사자식대', '물품구입비', '학생식대/간식', '교사선물비', '심방비', '월례회', '절기예배', '교육활동비', '교재비', '스텝/교사 교육비', '부모모임', '예함', '자부담수입']
  },
  '유치1부': {
    category: '차세대',
    spreadsheetId: '1pWJfNkyCWfCdCz-zB_VmRzMmc3HZsVpWH_92tbLfSkM',
    sheetName: '회계용',
    categories: ['선물비', '봉사자식대', '물품구입비', '학생식대/간식', '교사선물비', '심방비', '월례회', '절기예배', '교육활동비', '교재비', '스텝/교사 교육비', '부모모임', '예함', '자부담수입']
  },
  '유치2부': {
    category: '차세대',
    spreadsheetId: '1hMzlrg19E1BZ421T-s1deFTmV_QSpV9WTA3stCK2Al8',
    sheetName: '회계용',
    categories: ['선물비', '봉사자식대', '물품구입비', '학생식대/간식', '교사선물비', '심방비', '월례회', '절기예배', '교육활동비', '교재비', '스텝/교사 교육비', '부모모임', '예함', '자부담수입']
  },
  '유년1부': {
    category: '차세대',
    spreadsheetId: '1jp6kr3sMev8I1qQJHPhQ4gcmVb6Ippa-oBOToqpSPcg',
    sheetName: '회계용',
    categories: ['선물비', '봉사자식대', '물품구입비', '팀운영비', '학생식대/간식', '교사선물비', '심방비', '월례회', '절기예배', '교육활동비', '교재비', '스텝/교사 교육비', '부모모임', '제자훈련', '예함', '자부담수입']
  },
  '유년2부': {
    category: '차세대',
    spreadsheetId: '1UWy7QapjC782JEij4MhiUG8-8YRSH9fpT10vhZD2Uq0',
    sheetName: '회계용',
    categories: ['선물비', '봉사자식대', '물품구입비', '팀운영비', '학생식대/간식', '교사선물비', '심방비', '월례회', '절기예배', '교육활동비', '교재비', '스텝/교사 교육비', '부모모임', '제자훈련', '예함', '자부담수입']
  },
  '소년1부': {
    category: '차세대',
    spreadsheetId: '1FWgh5lRsmhlvXDnmNLbhewEPoDGVZaKz4IMFc6c_cmg',
    sheetName: '회계용',
    categories: ['선물비', '봉사자식대', '물품구입비', '팀운영비', '학생식대/간식', '교사선물비', '심방비', '월례회', '절기예배', '교육활동비', '교재비', '스텝/교사 교육비', '부모모임', '제자훈련', '예함', '자부담수입']
  },
  '소년2부': {
    category: '차세대',
    spreadsheetId: '15dyzAIQI-Eepz-gGvQfB9iSQIq9PBqBEMGg2armuYLo',
    sheetName: '회계용',
    categories: ['선물비', '봉사자식대', '물품구입비', '팀운영비', '학생식대/간식', '교사선물비', '심방비', '월례회', '절기예배', '교육활동비', '교재비', '스텝/교사 교육비', '부모모임', '제자훈련', '자부담수입']
  },
  '청소년1부': {
    category: '차세대',
    spreadsheetId: '18KnmtJZgjdULNRZFyFD_VpQnrE6loLDtV3pVvuj-rSA',
    sheetName: '회계용',
    categories: ['선물비', '봉사자식대', '물품구입비', '팀운영비', '학생식대/간식', '교사선물비', '심방비', '월례회', '절기예배', '교육활동비', '스텝/교사 교육비', '리더십 훈련', '행사지원', '동계수련회', '예함', '자부담수입']
  },
  '청소년2부': {
    category: '차세대',
    spreadsheetId: '1lXs8YVdgsX0oNECyyq1PnSXRVxzgUFBiSatll5rcHf0',
    sheetName: '회계용',
    categories: ['선물비', '봉사자식대', '물품구입비', '팀운영비', '학생식대/간식', '교사선물비', '심방비', '월례회', '절기예배', '교육활동비', '스텝/교사 교육비', '리더십 훈련', '자부담수입']
  },
  
  // 청년부
  '청년부통합': {
    category: '청년부',
    spreadsheetId: '1_OLIKITIK8h7LOHjAqNs9YcjbxehifECPjC4MWA8cSU',
    sheetName: '회계용',
    categories: ['선물비', '물품구입비', '부서운영비', '사역팀운영비', '교역자수련회', '심방비', '경조사비', '워크샵', '교육훈련비', '특별새벽기도', '동계수련회', '행사지원', '국내 아웃리치', '자부담수입']
  },
  'LIKE JESUS': {
    category: '청년부',
    spreadsheetId: '1Y1wgVIH3q7w9GZTHW94mn5vpwHlkd6vwKkm2Bi3J4Jo',
    sheetName: '회계용',
    categories: ['선물비', '리더모임', '엠티비', '부서운영비', '소그룹모임', '리더수련회', '행사지원', '자부담수입']
  },
  'ON JESUS': {
    category: '청년부',
    spreadsheetId: '1yjCllCm9_Rp8asP5aWw7LL51iEplufW83gd2iTFRSWc',
    sheetName: '회계용',
    categories: ['선물비', '리더모임', '엠티비', '물품구입비', '부서운영비', '팀운영비', '공동체모임', '소그룹모임', '리더수련회', '행사지원', '자부담수입']
  },
  'WITH JESUS': {
    category: '청년부',
    spreadsheetId: '1LZw2ebtZNN_QdjnQEX3srzmjpwsTPmOzfP_I1wMGnsc',
    sheetName: '회계용',
    categories: ['선물비', '리더모임', '엠티비', '물품구입비', '팀운영비', '소그룹모임', '공동체모임', '리더수련회', '행사지원', '자부담수입']
  },
  'IN JESUS': {
    category: '청년부',
    spreadsheetId: '1jkTrzR8SODqkrhFQi7COjN95j0dM9VskMNhdL5ynFSA',
    sheetName: '회계용',
    categories: ['선물비', '리더모임', '엠티비', '물품구입비', '부서운영비', '공동체모임', '소그룹모임', '리더수련회', '행사지원', '자부담수입']
  },
  'BY JESUS': {
    category: '청년부',
    spreadsheetId: '15LpR22d_Mruq0OgvI0AoorUY3D1FMFLJj3UTE5QFlnI',
    sheetName: '회계용',
    categories: ['선물비', '리더모임', '엠티비', '물품구입비', '부서운영비', '공동체모임', '소그룹모임', '리더수련회', '행사지원', '자부담수입']
  },
  '청년새가족': {
    category: '청년부',
    spreadsheetId: '1yxQ_ZzBgahEmkUqnzbqp3yOpKV-c8Yyy_E4cNPBqVCU',
    sheetName: '회계용',
    categories: ['부서운영비', '물품구입비', '엠티비', '새가족교육비', '새가족선물', '자부담수입']
  },
  '예배서포터즈': {
    category: '청년부',
    spreadsheetId: '1YO3OF0-I9uPu_KtbyKVpLxacVvPFjh5OhgowmebZbMI',
    sheetName: '회계용',
    categories: ['부서운영비', '엠티비', '물품구입비', '자부담수입']
  },
  
  // 선교
  '세계선교부': {
    category: '선교',
    spreadsheetId: '1LpnV_OPiXt4rJBnwK0TM4KjP2CKlZy70bwVu9pEcHmM',
    sheetName: '회계용',
    categories: ['부서운영비', '선교교육', '열방기도', '아웃리치', '선교훈련', '파송', '협력', '현지인사역자', '미션빌더', '프로젝트', '사역지원', '선교사복지', '선교사케어', '자부담수입']
  },
  '의료선교부': {
    category: '선교',
    spreadsheetId: '15ROitEIWv6Mdam-YvqQ-aDl2Jo6TQkMmxT7xCKBvwoI',
    sheetName: '회계용',
    categories: ['부서운영비', '해외진료', '국내진료', '약품구입', '자부담수입']
  },
  '통일선교부': {
    category: '선교',
    spreadsheetId: '1ssHiYCy0Y3sWsgVnppmU9bAOgYPcicWPF3bdbE8AxUQ',
    sheetName: '회계용',
    categories: ['부서운영비', '통일교육', '통일기도', '통일사역', '협력사역자', '자부담수입']
  },
  
  // 나눔
  '푸른나눔': {
    category: '나눔',
    spreadsheetId: '1dObyuSxkxMrVN4p0RLCN4vQs6ViPB_uzoh5TfD3dH3E',
    sheetName: '회계용',
    categories: ['푸른나눔사역지원비', '위기가정지원비', '푸른나눔 교육', '러브하우스', '이웃사랑', '새꿈터', '푸른공부방', '우리동네높은뜻', '은빛사랑', '푸른동행', '해바라기', '너나들이', '신규사역', '자부담수입']
  }
};

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    
    if (!data.department || !DEPARTMENTS[data.department]) {
      throw new Error('유효하지 않은 부서명입니다.');
    }
    
    var config = DEPARTMENTS[data.department];
    var spreadsheet = SpreadsheetApp.openById(config.spreadsheetId);
    var sheet = spreadsheet.getSheetByName(config.sheetName);
    
    if (!sheet) {
      throw new Error('"' + config.sheetName + '" 시트를 찾을 수 없습니다.');
    }
    
    var expenseDateObj = new Date(data.expenseDate);
    var formattedExpenseDate = Utilities.formatDate(expenseDateObj, Session.getScriptTimeZone(), "yyyy. M. d");
    
    var approvalDateObj = new Date(data.approvalDate);
    var formattedApprovalDate = Utilities.formatDate(approvalDateObj, Session.getScriptTimeZone(), "yyyy. M. d");
    
    var lastRow = sheet.getLastRow();
    var targetRow = 2;
    
    for (var i = 2; i <= lastRow + 1; i++) {
      var cellValue = sheet.getRange(i, 1).getValue();
      if (cellValue === "" || cellValue === null) {
        targetRow = i;
        break;
      }
    }
    
    var isIncome = (data.category === '자부담수입');
    
    var range = sheet.getRange(targetRow, 1, 1, 9);
    range.setValues([[
      data.category,
      formattedExpenseDate,
      data.description,
      isIncome ? '' : Number(data.amount),
      isIncome ? Number(data.amount) : '',
      data.fundType,
      data.user || '',
      data.depositCheck || false,
      formattedApprovalDate
    ]]);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': data.department + ' 부서에 데이터가 저장되었습니다.'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    var action = e.parameter.action;
    
    // 날짜 목록 조회 (최적화)
    if (action === 'getDates') {
      var department = e.parameter.department;
      if (!department || !DEPARTMENTS[department]) {
        throw new Error('유효하지 않은 부서명입니다.');
      }
      
      var config = DEPARTMENTS[department];
      var spreadsheet = SpreadsheetApp.openById(config.spreadsheetId);
      var sheet = spreadsheet.getSheetByName(config.sheetName);
      
      var lastRow = sheet.getLastRow();
      if (lastRow < 2) {
        return ContentService
          .createTextOutput(JSON.stringify({ dates: [] }))
          .setMimeType(ContentService.MimeType.JSON);
      }
      
      // I열(9번째 열) 전체를 한 번에 읽기
      var dateRange = sheet.getRange(2, 9, lastRow - 1, 1).getValues();
      var dateSet = {};
      
      for (var i = 0; i < dateRange.length; i++) {
        var approvalDate = dateRange[i][0];
        if (approvalDate) {
          var dateStr = typeof approvalDate === 'string' ? 
            approvalDate : 
            Utilities.formatDate(approvalDate, Session.getScriptTimeZone(), "yyyy. M. d");
          dateSet[dateStr] = true;
        }
      }
      
      // 날짜 배열로 변환 및 최신순 정렬
      var dates = Object.keys(dateSet).sort(function(a, b) {
        return new Date(b.replace(/\. /g, '-')) - new Date(a.replace(/\. /g, '-'));
      });
      
      return ContentService
        .createTextOutput(JSON.stringify({ dates: dates }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // 특정 날짜 데이터 합계 조회 (최적화 + 지원금/자부담 구분)
    if (action === 'getSummary') {
      var department = e.parameter.department;
      var targetDate = e.parameter.date;
      
      if (!department || !DEPARTMENTS[department]) {
        throw new Error('유효하지 않은 부서명입니다.');
      }
      
      var config = DEPARTMENTS[department];
      var spreadsheet = SpreadsheetApp.openById(config.spreadsheetId);
      var sheet = spreadsheet.getSheetByName(config.sheetName);
      
      var lastRow = sheet.getLastRow();
      if (lastRow < 2) {
        return ContentService
          .createTextOutput(JSON.stringify({ summary: {} }))
          .setMimeType(ContentService.MimeType.JSON);
      }
      
      // 필요한 열(A:계정과목, D:지출금액, E:수입금액, F:지원금/자부담, I:지출결의날짜)을 한 번에 읽기
      var data = sheet.getRange(2, 1, lastRow - 1, 9).getValues();
      var summary = {};
      var orderMap = {}; // 계정과목이 처음 등장한 순서 기록
      var orderCounter = 0;
      
      // 데이터 집계
      for (var i = 0; i < data.length; i++) {
        var approvalDate = data[i][8]; // I열 (0-based: 8)
        var dateStr = typeof approvalDate === 'string' ? 
          approvalDate : 
          Utilities.formatDate(approvalDate, Session.getScriptTimeZone(), "yyyy. M. d");
        
        if (dateStr === targetDate) {
          var category = data[i][0];      // A열: 계정과목
          var expenseAmount = data[i][3] || 0;  // D열: 지출금액
          var incomeAmount = data[i][4] || 0;   // E열: 수입금액
          var fundType = data[i][5];      // F열: 지원금/자부담
          var amount = expenseAmount || incomeAmount;
          var isIncome = incomeAmount > 0;
          
          if (!summary[category]) {
            summary[category] = {
              isIncome: isIncome,
              지원금: { total: 0, count: 0 },
              자부담: { total: 0, count: 0 }
            };
            // 처음 등장한 순서 기록
            orderMap[category] = orderCounter++;
          }
          
          // 자부담수입은 구분 없이 합산
          if (isIncome) {
            summary[category].자부담.total += Number(amount);
            summary[category].자부담.count += 1;
          } else {
            // 지출은 지원금/자부담 구분
            if (fundType === '지원금') {
              summary[category].지원금.total += Number(amount);
              summary[category].지원금.count += 1;
            } else if (fundType === '자부담') {
              summary[category].자부담.total += Number(amount);
              summary[category].자부담.count += 1;
            }
          }
        }
      }
      
      return ContentService
        .createTextOutput(JSON.stringify({ summary: summary, order: orderMap }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // 예결산 데이터 조회 (회계용 + 행정용 둘 다 반환)
    if (action === 'getBudget') {
      var department = e.parameter.department;

      if (!department || !DEPARTMENTS[department]) {
        throw new Error('유효하지 않은 부서명입니다.');
      }

      var config = DEPARTMENTS[department];
      var spreadsheet = SpreadsheetApp.openById(config.spreadsheetId);
      var sheet = spreadsheet.getSheetByName('예결산');

      function emptySection() {
        return {
          budgetData: [],
          selfBudgetData: [],
          supportTotals: { budget: 0, expense: 0, balance: 0 },
          selfTotals: { income: 0, expense: 0, balance: 0 }
        };
      }

      if (!sheet) {
        return ContentService
          .createTextOutput(JSON.stringify({
            error: '예결산 시트를 찾을 수 없습니다.',
            accounting: emptySection(),
            admin: emptySection()
          }))
          .setMimeType(ContentService.MimeType.JSON);
      }

      var lastRow = sheet.getLastRow();
      if (lastRow < 2) {
        return ContentService
          .createTextOutput(JSON.stringify({
            accounting: emptySection(),
            admin: emptySection()
          }))
          .setMimeType(ContentService.MimeType.JSON);
      }

      // B:계정과목, D:예산, E:지원금지출, F:지원금잔액, G:결산율, I:자부담수입, J:자부담지출, K:자부담잔액
      var data = sheet.getRange(2, 1, lastRow - 1, 11).getValues();

      // A열(부서명)이 빈 행 뒤에 다시 등장하면 거기서부터 행정용 섹션
      var boundaryIndex = data.length;
      var foundFirstSection = false;
      for (var i = 0; i < data.length; i++) {
        var deptName = data[i][0];
        if (deptName && deptName !== '' && !foundFirstSection) {
          foundFirstSection = true;
        }
        if (foundFirstSection && deptName && deptName !== '' && i > 0) {
          var prevDeptName = data[i-1][0];
          if (prevDeptName === '' || prevDeptName === null) {
            boundaryIndex = i;
            break;
          }
        }
      }

      function parseSection(rows) {
        var result = emptySection();
        for (var i = 0; i < rows.length; i++) {
          var category = rows[i][1];
          if (!category || category === '합계' || category === '' || category === '계정과목') continue;

          var budget = Number(rows[i][3]) || 0;
          var supportExpense = Number(rows[i][4]) || 0;
          var supportBalance = Number(rows[i][5]) || 0;
          var executionRate = rows[i][6] || '';
          var selfIncome = Number(rows[i][8]) || 0;
          var selfExpense = Number(rows[i][9]) || 0;
          var selfBalance = Number(rows[i][10]) || 0;

          if (budget !== 0 || supportExpense !== 0 || supportBalance !== 0) {
            result.budgetData.push({
              category: String(category),
              budget: budget,
              expense: supportExpense,
              balance: supportBalance,
              executionRate: String(executionRate)
            });
            result.supportTotals.budget += budget;
            result.supportTotals.expense += supportExpense;
            result.supportTotals.balance += supportBalance;
          }

          if (selfExpense !== 0) {
            result.selfBudgetData.push({
              category: String(category),
              expense: selfExpense
            });
          }

          result.selfTotals.income += selfIncome;
          result.selfTotals.expense += selfExpense;
          result.selfTotals.balance += selfBalance;
        }
        return result;
      }

      var accounting = parseSection(data.slice(0, boundaryIndex));
      var admin = parseSection(data.slice(boundaryIndex));

      return ContentService
        .createTextOutput(JSON.stringify({
          accounting: accounting,
          admin: admin
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 계정과목별 raw 지출 내역 조회 (회계용 또는 행정용)
    if (action === 'getTransactions') {
      var department = e.parameter.department;
      var sheetType = e.parameter.sheetType;

      if (!department || !DEPARTMENTS[department]) {
        throw new Error('유효하지 않은 부서명입니다.');
      }

      var columns = SHEET_COLUMNS[sheetType];
      if (!columns) {
        throw new Error('유효하지 않은 sheetType입니다. (accounting 또는 admin)');
      }

      var config = DEPARTMENTS[department];
      var spreadsheet = SpreadsheetApp.openById(config.spreadsheetId);
      var sheet = spreadsheet.getSheetByName(columns.sheetName);

      // 시트가 없으면 빈 배열 + sheetMissing 플래그 (행정용 미동기화 부서 대응)
      if (!sheet) {
        return ContentService
          .createTextOutput(JSON.stringify({ transactions: [], sheetMissing: true }))
          .setMimeType(ContentService.MimeType.JSON);
      }

      var lastRow = sheet.getLastRow();
      if (lastRow < 2) {
        return ContentService
          .createTextOutput(JSON.stringify({ transactions: [] }))
          .setMimeType(ContentService.MimeType.JSON);
      }

      // "yyyy. M. d" 명시적 파싱. Date면 그대로, 실패 시 epoch(1970)로 정렬 맨 뒤
      function parseSheetDate(value) {
        if (value instanceof Date && !isNaN(value.getTime())) {
          return value;
        }
        if (typeof value === 'string' && value.trim() !== '') {
          var match = value.trim().match(/^(\d{4})\.\s*(\d{1,2})\.\s*(\d{1,2})$/);
          if (match) {
            var parsed = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
            if (!isNaN(parsed.getTime())) return parsed;
          }
        }
        return new Date(0);
      }

      // A~I 9열을 한 번에 읽기
      var data = sheet.getRange(2, 1, lastRow - 1, 9).getValues();
      var transactions = [];

      for (var i = 0; i < data.length; i++) {
        var row = data[i];
        var category = row[columns.cat];
        var amount = Number(row[columns.amount]) || 0;

        // 카테고리 없거나 지출금액이 없으면 skip (수입행 자연스럽게 제외)
        if (!category || category === '' || amount === 0) continue;

        var dateValue = row[columns.date];
        var sortDate = parseSheetDate(dateValue);

        // 응답용 표시 문자열: Date면 포맷, 비어있거나 파싱 실패면 '' 또는 원본
        var dateStr = '';
        if (dateValue instanceof Date && !isNaN(dateValue.getTime())) {
          dateStr = Utilities.formatDate(dateValue, Session.getScriptTimeZone(), "yyyy. M. d");
        } else if (typeof dateValue === 'string' && dateValue.trim() !== '') {
          dateStr = dateValue.trim();
        }

        transactions.push({
          category: String(category),
          date: dateStr,
          description: String(row[columns.desc] || ''),
          amount: amount,
          fundType: String(row[columns.fund] || ''),
          _sortDate: sortDate.getTime()
        });
      }

      // 최신순 정렬 후 임시 필드 제거
      transactions.sort(function(a, b) {
        return b._sortDate - a._sortDate;
      });
      transactions.forEach(function(t) { delete t._sortDate; });

      return ContentService
        .createTextOutput(JSON.stringify({ transactions: transactions }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput("웹앱이 작동 중입니다.");
    
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function testAdd() {
  var spreadsheet = SpreadsheetApp.openById('1SVrorij3jwO2Vd7SjAwBrILosZU-A79zr_3XCAfUl1Y');
  var sheet = spreadsheet.getSheetByName('회계용');
  
  Logger.log('시트 이름: ' + sheet.getName());
  
  var lastRow = sheet.getLastRow();
  var targetRow = 2;
  
  for (var i = 2; i <= lastRow + 1; i++) {
    var cellValue = sheet.getRange(i, 1).getValue();
    if (cellValue === "" || cellValue === null) {
      targetRow = i;
      break;
    }
  }
  
  Logger.log('빈 행 찾음: ' + targetRow + '번 행');
  
  var range = sheet.getRange(targetRow, 1, 1, 9);
  range.setValues([[
    "봉사자식대",
    "2026. 1. 24",
    "순서정렬테스트",
    50000,
    "",
    "지원금",
    "홍길동",
    false,
    "2026. 1. 24"
  ]]);
  
  Logger.log('데이터 입력 완료!');
}
