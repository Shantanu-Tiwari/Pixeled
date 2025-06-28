"use client";

import {
    useCanRedo,
    useCanUndo,
    useHistory,
    useMyPresence,
    useSelf,
    useStorage,
} from "@liveblocks/react";
import {
    colorToCss,
    pointerEventToCanvasPoint,
} from "~/utils";
import LayerComponent from "./LayerComponent";
import {
    Camera,
    CanvasMode,
    CanvasState,
    Color,
} from "~/types";
import { useState } from "react";
import ToolsBar from "../toolsbar/ToolsBar";
import Path from "./Path";
import SelectionBox from "./SelectionBox";
import useDeleteLayers from "~/hooks/useDeleteLayers";
import SelectionTools from "./SelectionTools";
import Sidebars from "../sidebars/Sidebars";
import MultiplayerGuides from "./MultiplayerGuides";
import type { User } from "@prisma/client";

export default function Canvas({
                                   roomName,
                                   roomId,
                                   othersWithAccessToRoom,
                               }: {
    roomName: string;
    roomId: string;
    othersWithAccessToRoom: User[];
}) {
    const [leftIsMinimized, setLeftIsMinimized] = useState(false);
    const roomColor = useStorage((root) => root.roomColor as Color | undefined);
    const layerIds = useStorage((root) => root.layerIds as string[] | undefined);
    const pencilDraft = useSelf((me) => me.presence.pencilDraft as number[][] | null);
    const [myPresence, updateMyPresence] = useMyPresence();
    const [canvasState, setState] = useState<CanvasState>({ mode: CanvasMode.None });
    const [camera, setCamera] = useState<Camera>({ x: 0, y: 0, zoom: 1 });
    const history = useHistory();
    const canUndo = useCanUndo();
    const canRedo = useCanRedo();

    const handleLayerPointerDown = () => {
        // TODO: Implement layer pointer down logic
    };

    const handleResizeHandlePointerDown = () => {
        // TODO: Implement resize handle pointer down logic
    };

    function handlePointerDown(e: React.PointerEvent<SVGSVGElement>) {
        if (canvasState.mode === CanvasMode.Pencil) {
            const point = pointerEventToCanvasPoint(e, camera);
            updateMyPresence({ pencilDraft: [[point.x, point.y, e.pressure || 0.5]] });
        }
    }

    function handlePointerMove(e: React.PointerEvent<SVGSVGElement>) {
        if (canvasState.mode === CanvasMode.Pencil && e.buttons === 1 && pencilDraft) {
            const point = pointerEventToCanvasPoint(e, camera);
            updateMyPresence({ pencilDraft: [...pencilDraft, [point.x, point.y]] });
        }
    }

    function handlePointerUp() {
        if (canvasState.mode === CanvasMode.Pencil && pencilDraft && pencilDraft.length > 1) {
            updateMyPresence({ pencilDraft: null });
            // Add logic here to save the drawn path as a new layer in storage
        }
    }

    if (!layerIds || !roomColor) {
        return <div>Loading canvas...</div>;
    }

    return (
        <div className="flex h-screen w-full">
            <main className="fixed left-0 right-0 h-screen overflow-y-auto">
                <div
                    style={{ backgroundColor: colorToCss(roomColor) }}
                    className="h-full w-full touch-none"
                >
                    <SelectionTools camera={camera} canvasMode={canvasState.mode} />
                    <svg
                        className="h-full w-full"
                        onContextMenu={(e) => e.preventDefault()}
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                    >
                        <g
                            style={{
                                transform: `translate(${camera.x}px, ${camera.y}px) scale(${camera.zoom})`,
                            }}
                        >
                            {layerIds.map((id) => (
                                <LayerComponent
                                    key={id}
                                    id={id}
                                    onLayerPointerDown={handleLayerPointerDown}
                                />
                            ))}
                            <SelectionBox onResizeHandlePointerDown={handleResizeHandlePointerDown} />
                            <MultiplayerGuides />
                            {pencilDraft !== null && pencilDraft.length > 0 && (
                                <Path
                                    x={0}
                                    y={0}
                                    opacity={100}
                                    fill={colorToCss({ r: 217, g: 217, b: 217 })}
                                    points={pencilDraft}
                                />
                            )}
                        </g>
                    </svg>
                </div>
            </main>
            <ToolsBar
                canvasState={canvasState}
                setCanvasState={setState}
                zoomIn={() => setCamera((c) => ({ ...c, zoom: c.zoom + 0.1 }))}
                zoomOut={() => setCamera((c) => ({ ...c, zoom: c.zoom - 0.1 }))}
                canZoomIn={camera.zoom < 2}
                canZoomOut={camera.zoom > 0.5}
                redo={() => history.redo()}
                undo={() => history.undo()}
                canRedo={canRedo}
                canUndo={canUndo}
            />
            <Sidebars
                roomName={roomName}
                roomId={roomId}
                othersWithAccessToRoom={othersWithAccessToRoom}
                leftIsMinimized={leftIsMinimized}
                setLeftIsMinimized={setLeftIsMinimized}
            />
        </div>
    );
}
