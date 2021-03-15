const syllabus_panel_body = document.getElementsByClassName("panel-body js-syllabus-show-region")[0];
syllabus_panel_body.addEventListener("DOMNodeInserted", run);
function run(_e) {
    const subject = {};
    const syllabus_info = document.getElementsByClassName("syllabus__information")[0];
    const subject_name = syllabus_info.getElementsByClassName("syllabus__subject-name")[0];
    subject["科目名"] = subject_name.textContent;
    const tables = syllabus_info.getElementsByClassName("table");
    const table1 = tables[0];
    const ths1 = table1.getElementsByTagName("th");
    const tds1 = table1.getElementsByTagName("td");
    for (let index = 0; index < ths1.length; index++) {
        const th1 = ths1[index];
        const td1 = tds1[index];
        subject[th1.textContent] = td1.textContent;
    }
    const table2 = tables[1];
    const trs2 = table2.getElementsByTagName("tr");
    for (let index = 0; index < trs2.length; index++) {
        if (index == 0) continue;
        const td2_1 = trs2[index].cells.item(0);
        const td2_2 = trs2[index].cells.item(1);
        const td2_3 = trs2[index].cells.item(2);
        subject[td2_1.textContent] = [td2_2.textContent, td2_3.textContent];
    }
    chrome.storage.local.get(data => {
        const subject_code = subject["科目コード"];
        const subject_class = subject["クラス"];
        if (data[subject_code] == void 0) {
            data[subject_code] = {};
        }
        data[subject_code][subject_class] = subject;
        chrome.storage.local.set(data, () => window.alert("Subject saved"));
    });
}