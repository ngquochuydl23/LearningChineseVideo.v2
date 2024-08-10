import generateDashByText from "./generate-dash-by-text";

export default function autoGenerateVarients(options) {
    let sets = [[]];
    const id_obj = {};
    options.forEach(option => {
        const new_sets = [];
        option.optionValues.forEach((value) => {
            new_sets.push(Array.from(sets, set => [...set, value]));
            id_obj[value] = { option: option.title, value_id: value };
        });
        sets = new_sets.flatMap(set => set);
    });

    return sets.map((varientValues) => ({
        title: varientValues.join(' '),
        price: 0,
        varientValues: varientValues.map((varientVal, index) => ({
            option: options[index].title,
            value: varientVal
        }))
    }))
}
