
const label = {
  survivalStatus: {
    0: "存活",
    1: "已屏蔽",
    2: "查无此人",
  },
  person: {
    0: "真人",
    1: "骗子",
  },
	anonymity: {
		0: "匿名",
		1: "不匿名"
	}
};
const dict = {};
Object.keys(label).forEach((item) => {
  dict[item] = Object.entries(label[item]).reduce((pre, cur) => {
    const [value, label] = cur;
    pre = pre.concat({ value, label,text: label });
    return pre;
  }, []);
});

export const dicts = {
  dict,
  label,
};