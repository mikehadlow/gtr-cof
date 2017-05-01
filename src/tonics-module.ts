
namespace tonics {

    let buttons: d3.Selection<ButtonData> = null;

    interface ButtonData {
        readonly noteBase: music.NoteBase;
        readonly label: string;
        readonly index: number;
        readonly greyOut: boolean;
    };

    function bg(noteBase: music.NoteBase): Array<ButtonData> {

        let flatIndex = noteBase.index == 0 ? 11 : noteBase.index - 1;
        let sharpIndex = (noteBase.index + 1) % 12;
        return [
            { noteBase: noteBase, label: noteBase.name + "♭", index: flatIndex, greyOut: music.indexIsNatural(flatIndex) },
            { noteBase: noteBase, label: noteBase.name + "", index: noteBase.index, greyOut: false },
            { noteBase: noteBase, label: noteBase.name + "♯", index: sharpIndex, greyOut: music.indexIsNatural(sharpIndex) }
        ];
    }

    export function init(): void {
        let pad = 5;
        let buttonHeight = 25;
        let svg = d3.select("#modes");

        let tonics = svg.append("g");

        let gs = tonics.selectAll("g")
            .data(music.noteBases)
            .enter()
            .append("g")
            .attr("transform", function (d, i) { return "translate(0, " + (i * (buttonHeight + pad) + pad) + ")"; })
            .selectAll("g")
            .data(function (d) { return bg(d); }, indexer)
            .enter()
            .append("g")
            .attr("transform", function (d, i) { return "translate(" + (i * 55) + ", 0)"; });

        buttons = gs
            .append("rect")
            .attr("x", pad)
            .attr("y", 0)
            .attr("strokeWidth", 2)
            .attr("width", 40)
            .attr("height", 25)
            .attr("class", function (d) { return d.greyOut ? "tonic-button tonic-button-grey" : "tonic-button"; })
            .on("click", handleButtonClick);

        gs
            .append("text")
            .attr("x", pad + 10)
            .attr("y", 17)
            .text(function (x) { return x.label; })
            .attr("class", "tonic-text");

        state.addListener(listener);
    }

    function handleButtonClick(d: ButtonData, i: number): void {
        state.changeTonic(d.noteBase, d.index);
    }

    function listener(state: state.StateChange): void {
        let tonic = state.scale2[0];
        let ds: Array<ButtonData> = [{
            noteBase: state.noteBase,
            label: tonic.noteName,
            index: tonic.index,
            greyOut: (state.noteBase.index != tonic.index) && music.indexIsNatural(tonic.index)
        }];
        buttons
            .data(ds, indexer)
            .attr("class", "tonic-button tonic-button-selected")
            .exit()
            .attr("class", function (d) { return d.greyOut ? "tonic-button tonic-button-grey" : "tonic-button"; });
    }

    function indexer(d: ButtonData): string {
        return d.label;
    }
}
