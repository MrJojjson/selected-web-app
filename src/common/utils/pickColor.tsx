type PickColorByIndexType = {
    index: number;
};

const colors = ['#F08980', '#D07690', '#A26C96', '#72638D', '#485776', '#2F4858'];

export const pickColorByIndex = ({ index }: PickColorByIndexType) => colors[index];
