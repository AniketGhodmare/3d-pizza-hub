export default function ToggleSwitch({ show, onClick }) {

    return (
        <button type="button" onClick={onClick}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors   ${show ? "bg-green-500" : "bg-[#e16207]"}`}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform    ${show ? "translate-x-6" : "translate-x-1"}`}
            />
        </button>
    );
}
