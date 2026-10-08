import React, { useState, useMemo } from "react";
import { Navbar } from "./components/Navbar";
import { LiveTicker } from "./components/LiveTicker";
import { TopHeader } from "./components/TopHeader";
import { IdSearch } from "./components/IdSearch";
import { CategoryTabs } from "./components/CategoryTabs";
import { ItemCard } from "./components/ItemCard";
import { SelectionSidebar } from "./components/SelectionSidebar";
import { CommunityStats } from "./components/CommunityStats";
import { HowItWorks } from "./components/HowItWorks";
import { ServerStatusSection } from "./components/ServerStatusSection";
import { FaqSection } from "./components/FaqSection";
import { Footer } from "./components/Footer";
import { GeneratingModal } from "./components/GeneratingModal";
import { VerificationModal } from "./components/VerificationModal";
import { SuccessCelebration } from "./components/SuccessCelebration";
import { GarenaServerModal } from "./components/GarenaServerModal";
import { GARENA_SERVERS, GarenaServerNode } from "./services/garenaService";
import {
  FIST_ITEMS,
  SKIN_ITEMS,
  WEAPON_ITEMS,
  DIAMOND_ITEMS,
  CategoryId,
} from "./data/items";
import { GameItem, PlayerProfile, ModalState } from "./types";
import { sounds } from "./utils/audio";
import { AlertTriangle, CheckSquare, Square, Search, Filter, Sparkles } from "lucide-react";

export default function App() {
  const [currentServer, setCurrentServer] = useState<GarenaServerNode>(GARENA_SERVERS[0]);
  const [showServerModal, setShowServerModal] = useState<boolean>(false);
  const [playerId, setPlayerId] = useState<string>("");
  const [player, setPlayer] = useState<PlayerProfile | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryId>("diamonds");
  const [selectedItemIds, setSelectedItemIds] = useState<Set<string>>(new Set());
  const [modalState, setModalState] = useState<ModalState>("none");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [idError, setIdError] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(sounds.isMuted);
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [onlySpecialFilter, setOnlySpecialFilter] = useState<boolean>(false);

  // Category raw items
  const currentCategoryItems = useMemo(() => {
    switch (activeCategory) {
      case "fists":
        return FIST_ITEMS;
      case "skins":
        return SKIN_ITEMS;
      case "weapons":
        return WEAPON_ITEMS;
      case "diamonds":
        return DIAMOND_ITEMS;
      default:
        return DIAMOND_ITEMS;
    }
  }, [activeCategory]);

  // Filtered items based on search and tags
  const filteredCategoryItems = useMemo(() => {
    return currentCategoryItems.filter((it) => {
      if (searchFilter.trim()) {
        const query = searchFilter.toLowerCase().trim();
        const matchName = it.name.toLowerCase().includes(query);
        const matchTag = it.tag?.toLowerCase().includes(query);
        const matchAmount = it.amount?.toString().includes(query);
        if (!matchName && !matchTag && !matchAmount) return false;
      }
      if (onlySpecialFilter) {
        if (!it.tag) return false;
      }
      return true;
    });
  }, [currentCategoryItems, searchFilter, onlySpecialFilter]);

  // Map of all items for fast lookup
  const allItemsMap = useMemo(() => {
    const map = new Map<string, GameItem>();
    [...FIST_ITEMS, ...SKIN_ITEMS, ...WEAPON_ITEMS, ...DIAMOND_ITEMS].forEach((item) => {
      map.set(item.id, item);
    });
    return map;
  }, []);

  const selectedItemsList = useMemo(() => {
    return Array.from(selectedItemIds)
      .map((id) => allItemsMap.get(id))
      .filter((item): item is GameItem => Boolean(item));
  }, [selectedItemIds, allItemsMap]);

  // Count per category
  const selectedCounts = useMemo(() => {
    const counts: Record<CategoryId, number> = {
      fists: 0,
      skins: 0,
      weapons: 0,
      diamonds: 0,
    };
    selectedItemsList.forEach((item) => {
      if (counts[item.category] !== undefined) {
        counts[item.category]++;
      }
    });
    return counts;
  }, [selectedItemsList]);

  // Sound toggle
  const handleToggleMute = () => {
    const nextMuted = sounds.toggleMute();
    setIsMuted(nextMuted);
  };

  // Scroll to section
  const handleScrollTo = (sectionId: string) => {
    sounds.playTap();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Toggle single item
  const handleToggleItem = (item: GameItem) => {
    setSelectedItemIds((prev) => {
      const next = new Set(prev);
      if (next.has(item.id)) {
        next.delete(item.id);
      } else {
        next.add(item.id);
      }
      return next;
    });
    if (alertMessage) setAlertMessage(null);
  };

  // Remove item from sidebar
  const handleRemoveItem = (item: GameItem) => {
    setSelectedItemIds((prev) => {
      const next = new Set(prev);
      next.delete(item.id);
      return next;
    });
  };

  // Clear all items
  const handleClearAll = () => {
    setSelectedItemIds(new Set());
  };

  // Select all in current category
  const isAllCurrentSelected = useMemo(() => {
    if (filteredCategoryItems.length === 0) return false;
    return filteredCategoryItems.every((it) => selectedItemIds.has(it.id));
  }, [filteredCategoryItems, selectedItemIds]);

  const handleToggleSelectAll = () => {
    sounds.playTap();
    setSelectedItemIds((prev) => {
      const next = new Set(prev);
      if (isAllCurrentSelected) {
        filteredCategoryItems.forEach((it) => next.delete(it.id));
      } else {
        filteredCategoryItems.forEach((it) => next.add(it.id));
      }
      return next;
    });
  };

  // DAR button action
  const handleDarClick = () => {
    sounds.playTap();

    let targetId = playerId.trim();
    if (!targetId) {
      targetId = "1029384756";
      setPlayerId(targetId);
      if (!player) {
        setPlayer({
          id: targetId,
          nickname: "SOBREVIVIENTE_FF",
          region: currentServer.region,
          level: 68,
          rank: "Heroico",
          likes: 2450,
          verifiedGarena: true,
          pagoStoreVerified: true,
          pagoStoreUrl: "https://pagostore.garena.com/",
        });
      }
    }

    if (selectedItemIds.size === 0) {
      const defaultItem = DIAMOND_ITEMS[0]?.id || "dia-5";
      setSelectedItemIds(new Set([defaultItem]));
    }

    setAlertMessage(null);
    setModalState("generating");
  };

  // Reset entire generator
  const handleReset = () => {
    setModalState("none");
    setSelectedItemIds(new Set());
    setPlayer(null);
    setPlayerId("");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0d] text-zinc-100 flex flex-col font-sans selection:bg-amber-400 selection:text-zinc-950">
      {/* 1. Website Global Navbar */}
      <Navbar
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onScrollTo={handleScrollTo}
        selectedCount={selectedItemsList.length}
        currentServer={currentServer}
        onOpenServerModal={() => setShowServerModal(true)}
      />

      {/* Main Portal & Generator Section */}
      <section id="generator-section" className="w-full pt-4 pb-12 px-4 sm:px-6 lg:px-8">
        {/* Top Header stats with exact Gold coins, Diamonds, Verified */}
        <TopHeader />

        {/* ID Search with orange button & detected player card */}
        <IdSearch
          idValue={playerId}
          onIdChange={(val) => {
            setPlayerId(val);
            if (idError) setIdError(false);
          }}
          player={player}
          onPlayerFound={(p) => {
            setPlayer(p);
            setPlayerId(p.id);
            if (alertMessage) setAlertMessage(null);
          }}
          currentServer={currentServer}
          onOpenServerModal={() => setShowServerModal(true)}
          hasError={idError}
        />

        {/* 4 Category Tabs (Puños, Ropa, Armas, Diamantes) */}
        <CategoryTabs
          activeCategory={activeCategory}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            setSearchFilter("");
            setOnlySpecialFilter(false);
          }}
          selectedCounts={selectedCounts}
        />

        {/* Alert Banner if any error */}
        {alertMessage && (
          <div className="max-w-xl mx-auto px-3 mb-4 animate-fadeIn">
            <div className="bg-red-950/90 border border-red-500 rounded-xl p-3 flex items-center gap-2.5 text-xs text-red-200 shadow-lg">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
              <span>{alertMessage}</span>
            </div>
          </div>
        )}

        {/* Responsive Dual Layout: Catalog Grid + Desktop Sticky Sidebar */}
        <div className="max-w-7xl mx-auto mt-2">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left / Main Column: Items Catalog (col-span-8 on desktop, full width on mobile) */}
            <div className="lg:col-span-8 flex flex-col">
              {/* Category Controls Bar: Search within category, Filter, Select All */}
              <div className="bg-[#141419] border border-zinc-800/90 rounded-2xl p-3 mb-4 flex items-center justify-between gap-3">
                {/* Search in category */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder=""
                    className="w-full bg-[#1b1b22] text-xs text-zinc-200 placeholder-zinc-500 pl-9 pr-3 py-2 rounded-xl outline-none border border-zinc-800 focus:border-amber-400/60 transition-colors"
                  />
                  {searchFilter && (
                    <button
                      onClick={() => setSearchFilter("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 text-xs"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Filter and Select All Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  {activeCategory !== "diamonds" && (
                    <button
                      onClick={() => {
                        sounds.playTap();
                        setOnlySpecialFilter(!onlySpecialFilter);
                      }}
                      className={`p-2 rounded-xl border flex items-center justify-center cursor-pointer transition-colors ${
                        onlySpecialFilter
                          ? "bg-amber-400/20 border-amber-400/50 text-amber-300 font-bold"
                          : "bg-[#1b1b22] border-zinc-800 text-zinc-400 hover:text-zinc-200"
                      }`}
                      title="Destacados"
                    >
                      <Filter className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={handleToggleSelectAll}
                    className="p-2 rounded-xl bg-[#1b1b22] border border-zinc-800 hover:border-zinc-700 text-amber-400 hover:text-amber-300 font-medium flex items-center justify-center cursor-pointer transition-colors"
                    title="Seleccionar todo / Desmarcar"
                  >
                    {isAllCurrentSelected ? (
                      <CheckSquare className="w-4 h-4" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Items Grid */}
              {filteredCategoryItems.length === 0 ? (
                <div className="bg-[#141418] border border-zinc-800 rounded-2xl p-12 text-center text-zinc-400 text-sm">
                  <button
                    onClick={() => {
                      setSearchFilter("");
                      setOnlySpecialFilter(false);
                    }}
                    className="block mx-auto text-amber-400 underline font-bold"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div
                  id="items-grid-container"
                  className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-2.5 sm:gap-3"
                >
                  {filteredCategoryItems.map((item) => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      isSelected={selectedItemIds.has(item.id)}
                      onToggle={handleToggleItem}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Sticky Selection Sidebar (Visible on Desktop lg:) */}
            <div className="hidden lg:block lg:col-span-4">
              <SelectionSidebar
                player={player}
                playerId={playerId}
                selectedItems={selectedItemsList}
                onRemoveItem={handleRemoveItem}
                onClearAll={handleClearAll}
                onDarClick={handleDarClick}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Website Footer */}
      <Footer
        onScrollToTop={() => handleScrollTo("generator-section")}
      />

      {/* Sticky Bottom Action Button "DAR" (Mobile screens only, Screenshots 2, 3, 4, 5) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-[#09090b] via-[#09090b]/95 to-transparent pt-4 pb-4 px-3 pointer-events-none">
        <div className="w-full max-w-xl mx-auto pointer-events-auto">
          <button
            id="btn-dar"
            onClick={handleDarClick}
            className="w-full bg-[#facc15] hover:bg-[#eab308] active:bg-[#ca8a04] text-zinc-950 font-black text-2xl py-3.5 rounded-2xl tracking-wider uppercase shadow-[0_6px_25px_rgba(250,204,21,0.45)] transition-all transform active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
          >
            <span>DAR</span>
            {selectedItemIds.size > 0 && (
              <span className="text-base font-black bg-zinc-950 text-amber-300 px-2.5 py-0.5 rounded-full tracking-normal">
                {selectedItemIds.size}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Generating Sequence Modal */}
      {modalState === "generating" && (
        <GeneratingModal
          player={player}
          playerId={playerId}
          selectedItems={selectedItemsList}
          currentServer={currentServer}
          onComplete={() => setModalState("verification")}
          onCancel={() => setModalState("none")}
        />
      )}

      {/* Verification Required Modal (Screenshot 1 exact match) */}
      {modalState === "verification" && (
        <VerificationModal
          player={player}
          playerId={playerId}
          selectedItems={selectedItemsList}
          onClose={() => setModalState("none")}
          onVerifiedSuccess={() => setModalState("verified")}
        />
      )}

      {/* Success Celebration Screen with Confetti */}
      {modalState === "verified" && (
        <SuccessCelebration
          player={player}
          playerId={playerId}
          selectedItems={selectedItemsList}
          onReset={handleReset}
        />
      )}

      {/* Garena Server Connection & Diagnostic Modal */}
      {showServerModal && (
        <GarenaServerModal
          currentServer={currentServer}
          onSelectServer={(srv) => setCurrentServer(srv)}
          onClose={() => setShowServerModal(false)}
        />
      )}
    </div>
  );
}
