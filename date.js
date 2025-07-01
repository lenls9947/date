function updateTimeDiff() {
    const startDate = new Date(2019, 1, 21); // 2024年1月1日
    const now = new Date();

    let diffMs = now - startDate; // 毫秒差

    // 计算出各时间单位
    const msPerSecond = 1000;
    const msPerMinute = msPerSecond * 60;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;

    // 先计算完整的天数
    let days = Math.floor(diffMs / msPerDay);

    // 计算年和月（这里按自然月和年计算，需用日期方法）
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let daysInMonth = now.getDate() - startDate.getDate();

    if (daysInMonth < 0) {
      months -= 1;
      // 获取上个月的天数
      let prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      daysInMonth += prevMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // 计算小时、分钟、秒
    // 先减去年、月、天对应的时间，剩余的计算时分秒
    let tempDate = new Date(startDate);
    tempDate.setFullYear(tempDate.getFullYear() + years);
    tempDate.setMonth(tempDate.getMonth() + months);
    tempDate.setDate(tempDate.getDate() + daysInMonth);

    let diffRemainingMs = now - tempDate;

    let hours = Math.floor(diffRemainingMs / msPerHour);
    diffRemainingMs -= hours * msPerHour;

    let minutes = Math.floor(diffRemainingMs / msPerMinute);
    diffRemainingMs -= minutes * msPerMinute;

    let seconds = Math.floor(diffRemainingMs / msPerSecond);

    // 拼接字符串显示
    const result = `${years}年 ${months}月 ${daysInMonth}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`;

    document.getElementById('timeDiff').textContent = result;
  }

  // 页面加载后开始每秒更新一次
  setInterval(updateTimeDiff, 1000);
  updateTimeDiff(); // 立即调用一次，避免延迟1秒显示
