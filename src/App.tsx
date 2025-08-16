import './App.css'
import Header from './Header/Header'
import Puzzle from './Puzzle/Puzzle'

// function Board({ content }: { content: string }) {
//     return (
//         <>
//             <div className="rounded-lg m-1 flex items-center justify-center h-16 bg-[#efefe6]">
//                 <p className="p-2"> {content} </p>
//             </div>
//         </>
//     )
// }

function App() {
    // const data = [
    //     { category: 'Monster Loot', item: 'Slime' },
    //     { category: 'Monster Loot', item: 'Void Essence' },
    //     { category: 'Monster Loot', item: 'Bug Meat' },
    //     { category: 'Monster Loot', item: 'Solar Essence' },
    //     { category: 'Mushrooms', item: 'Chanterelle' },
    //     { category: 'Mushrooms', item: 'Morel' },
    //     { category: 'Mushrooms', item: 'Magma Cap' },
    //     { category: 'Mushrooms', item: 'Purple Mushroom' },
    //     { category: 'Vegetables', item: 'Cauliflower' },
    //     { category: 'Vegetables', item: 'Wheat' },
    //     { category: 'Vegetables', item: 'Kale' },
    //     { category: 'Vegetables', item: 'Radish' },
    //     { category: 'Fall seeds', item: 'Broccoli Seeds' },
    //     { category: 'Fall seeds', item: 'Cranberry Seeds' },
    //     { category: 'Fall seeds', item: 'Corn Seeds' },
    //     { category: 'Fall seeds', item: 'Artichoke Seeds' },
    // ]

    return (
        <>
            {/* <div className="grid grid-cols-4 grid-rows-4">
                {data.map((datapoint) => (
                    <Board content={datapoint.item}></Board>
                ))}
            </div> */}
            <Header></Header>
            <Puzzle></Puzzle>
        </>
    )
}

export default App
