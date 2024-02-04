'use client'
import { Card, Loader, Modal } from "@/components";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useMemo } from "react";
import "./list-user.scss";

interface ILocation {
  name: string;
  url: string;
}

interface IUser {
  created: string;
  episode: string[];
  gender: string;
  id: number;
  image: string;
  location: ILocation;
  name: string;
  origin: ILocation;
  species: string;
  status: string;
  type: string;
  url: string;
}

async function getUsers() {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const users = await res.json();
  return users;
}

export default function ListUsers() {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["initial-users"],
    queryFn: () => getUsers(),
    initialData: [],
  });

  const filteredUsers = useMemo(() => {
    if (!searchQuery) {
      return data?.results || [];
    }
    return (data?.results || []).filter((user: IUser) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  const toggleModal = () => {
    setIsModalOpen((prevIsModalOpen) => !prevIsModalOpen);
  };

  const onClickCardHandler = (id: number) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(id)) {
        return prevSelectedItems.filter((itemId) => itemId !== id);
      } else {
        return [...prevSelectedItems, id];
      }
    });
  };

  const removeSelectedItem = (id: number) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.filter((itemId) => itemId !== id)
    );
  };

  console.log(data, error, isLoading);

  return (
    <main>
      <div className="search-wrapper" onClick={toggleModal}>
      {selectedItems.length > 0 && (
        <div className="selected-items">
          {selectedItems?.map((itemId) => {
            const selectedItem = data?.results.find(
              (user: IUser) => user.id === itemId
            );
            return (
              <div key={itemId} className="selected-item">
                <span className="selected-item__name">
                  {selectedItem?.name}
                </span>
                <div className="remove-icon" onClick={() => removeSelectedItem(itemId)}>
                  &#10006;
                </div>
              </div>
            );
          })}
        </div>
      )}
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="arrow-icon">
          &#8595;
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {isModalOpen && (
            <Modal isOpen={true}>
              {filteredUsers.map((el: IUser) => (
                <div
                  onClick={() => onClickCardHandler(el.id)}
                  className={`card-wrapper ${selectedItems.includes(el.id) ? "selected" : ""}`}
                  key={el.id}
                >
                  <input type="checkbox" id={String(el.id)} checked={selectedItems.includes(el.id)} readOnly />
                  <Card searchInput={searchQuery} episodes={el?.episode?.length} imgUrl={el?.image} key={el.id} name={el.name} />
                </div>
              ))}
            </Modal>
          )}
        </>
      )}
    </main>
  );
}

