type PickColorByIndexType = {
    index: number;
};

const colors = ['rgba(45, 52, 54, 1)', 'rgb(240, 137, 128)', '#b4554f', 'rgba(237, 209, 147, 1)', '#72638d'];

export const pickColorByIndex = ({ index }: PickColorByIndexType) => colors[index];
