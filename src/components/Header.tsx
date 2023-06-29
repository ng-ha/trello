"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import trelloLogo from "@/assets/images/Trello_logo.svg.png";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Avatar from "./Avatar";
import { useBoardStore } from "@/store/BoardStore";
import { fetchSuggestion } from "@/lib/fetchSuggestion";

export default function Header() {
    const [board, searchString, setSearchString] = useBoardStore((state) => [
        state.board,
        state.searchString,
        state.setSearchString,
    ]);
    const [loading, setLoading] = useState<boolean>(false);
    const [suggestion, setSuggestion] = useState<string>("");

    useEffect(() => {
        if (board.columns.size === 0) return;

        const fetchSuggestionFunc = async () => {
            const suggestion = await fetchSuggestion(board);
            setSuggestion(suggestion);
            setLoading(false);
        };
        const timeoutId = setTimeout(() => {
            setLoading(true);
            fetchSuggestionFunc();
        }, 3000);

        return () => clearTimeout(timeoutId);
    }, [board]);
    return (
        <header>
            <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl">
                <div className="-z-50 absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-[#0055D1] rounded-md filter blur-3xl opacity-50" />
                <Image
                    src={trelloLogo}
                    alt="Trello logo"
                    className="w-44 md:w-56 pb-10 md:pb-0 object-contain"
                    priority
                />
                <div className="flex items-center space-x-5 flex-1 justify-end w-full">
                    <form className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
                        <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="flex-1 outline-none p-2"
                            value={searchString}
                            onChange={(e) => setSearchString(e.target.value)}
                        />
                        <button hidden>Search</button>
                    </form>
                    <Avatar />
                </div>
            </div>

            <div className="flex items-center justify-center px-5 py-2 md:py-5">
                <p className="flex items-center p-5 text-sm font-light pr-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-[#0055D1]">
                    <UserCircleIcon
                        className={`inline-block flex-shrink-0 h-10 w-10 text-[#0055D1] mr-4 ${
                            loading && "animate-spin"
                        }`}
                    />
                    {suggestion && !loading
                        ? suggestion
                        : " GPT is summarizing your tasks for the day... "}
                </p>
            </div>
        </header>
    );
}
