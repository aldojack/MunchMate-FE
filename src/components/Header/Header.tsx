

const Header = () => {
    return (
        <div className="w-full flex justify-between items-center fixed">
            <h1>MunchMate</h1>
            <div className="order-[-1]">
                <p>Hamburger Menu</p>
            </div>
            <div className="flex">
                <p>Search</p>
                <p>Favourites</p>
                <p>Shopping List</p>
            </div>
        </div>
    )
}

export default Header