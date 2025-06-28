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
    findIntersectionLayersWithRectangle,
    penPointsToPathPayer,
    pointerEventToCanvasPoint,
    resizeBounds,
} from "~/utils";
import LayerComponent from "./LayerComponent";
import {
    Camera,
    CanvasMode,
    CanvasState,
    Corner,
    EllipseLayer,
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