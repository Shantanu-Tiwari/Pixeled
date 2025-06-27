import { useSelf, useStorage } from "@liveblocks/react";
import { memo, useEffect, useRef, useState, FC } from "react";
import useSelectionBounds from "~/hooks/useSelectionBounds";
import { LayerType, Side, Corner, XYWH } from "~/types";

const handleWidth = 8;

interface SelectionBoxProps {
    onResizeHandlePointerDown: (corner: Side | Corner, initialBounds: XYWH) => void;
}

const SelectionBox: FC<SelectionBoxProps> = memo(({ onResizeHandlePointerDown }) => {
    const soleLayerId = useSelf((me) =>
        me.presence.selection.length === 1 ? me.presence.selection[0] : null,
    );

    const isShowingHandles = useStorage((root) => {
        if (!soleLayerId) return false;
        const layer = root.layers?.get?.(soleLayerId);
        return layer?.type !== LayerType.Path;
    });

    const bounds = useSelectionBounds();
    const textRef = useRef<SVGTextElement>(null);
    const [textWidth, setTextWidth] = useState(0);
    const padding = 16;

    useEffect(() => {
        if (textRef.current && bounds) {
            const bbox = textRef.current.getBBox();
            setTextWidth(bbox.width);
        }
    }, [bounds]);

    if (!bounds) return null;

    return (
        <>
            <rect
                style={{ transform: `translate(${bounds.x}px, ${bounds.y}px)` }}
                className="pointer-events-none fill-transparent stroke-[#0b99ff] stroke-[1px]"
                width={bounds.width}
                height={bounds.height}
            />
            <rect
                className="fill-[#0b99ff]"
                x={bounds.x + bounds.width / 2 - (textWidth + padding) / 2}
                y={bounds.y + bounds.height + 10}
                width={textWidth + padding}
                height={20}
                rx={4}
            />
            <text
                ref={textRef}
                style={{
                    transform: `translate(${bounds.x + bounds.width / 2}px, ${bounds.y + bounds.height + 25}px)`,
                }}
                textAnchor="middle"
                className="pointer-events-none select-none fill-white text-[11px]"
            >
                {Math.round(bounds.width)} x {Math.round(bounds.height)}
            </text>
            {isShowingHandles && (
                <>
                    {/* Top-left handle */}
                    <rect
                        style={{
                            cursor: "nwse-resize",
                            width: `${handleWidth}px`,
                            height: `${handleWidth}px`,
                            transform: `translate(${bounds.x - handleWidth / 2}px, ${bounds.y - handleWidth / 2}px)`,
                        }}
                        className="fill-white stroke-[#0b99ff] stroke-[1px]"
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizeHandlePointerDown(Corner.TopLeft, bounds as XYWH);
                        }}
                    />
                    {/* Top handle */}
                    <rect
                        style={{
                            cursor: "ns-resize",
                            width: `${handleWidth}px`,
                            height: `${handleWidth}px`,
                            transform: `translate(${bounds.x + bounds.width / 2 - handleWidth / 2}px, ${bounds.y - handleWidth / 2}px)`,
                        }}
                        className="fill-white stroke-[#0b99ff] stroke-[1px]"
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizeHandlePointerDown(Side.Top, bounds as XYWH);
                        }}
                    />
                    {/* Top-right handle */}
                    <rect
                        style={{
                            cursor: "nesw-resize",
                            width: `${handleWidth}px`,
                            height: `${handleWidth}px`,
                            transform: `translate(${bounds.x + bounds.width - handleWidth / 2}px, ${bounds.y - handleWidth / 2}px)`,
                        }}
                        className="fill-white stroke-[#0b99ff] stroke-[1px]"
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizeHandlePointerDown(Corner.TopRight, bounds as XYWH);
                        }}
                    />
                    {/* Left handle */}
                    <rect
                        style={{
                            cursor: "ew-resize",
                            width: `${handleWidth}px`,
                            height: `${handleWidth}px`,
                            transform: `translate(${bounds.x - handleWidth / 2}px, ${bounds.y + bounds.height / 2 - handleWidth / 2}px)`,
                        }}
                        className="fill-white stroke-[#0b99ff] stroke-[1px]"
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizeHandlePointerDown(Side.Left, bounds as XYWH);
                        }}
                    />
                    {/* Right handle */}
                    <rect
                        style={{
                            cursor: "ew-resize",
                            width: `${handleWidth}px`,
                            height: `${handleWidth}px`,
                            transform: `translate(${bounds.x + bounds.width - handleWidth / 2}px, ${bounds.y + bounds.height / 2 - handleWidth / 2}px)`,
                        }}
                        className="fill-white stroke-[#0b99ff] stroke-[1px]"
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizeHandlePointerDown(Side.Right, bounds as XYWH);
                        }}
                    />
                    {/* Bottom-left handle */}
                    <rect
                        style={{
                            cursor: "nesw-resize",
                            width: `${handleWidth}px`,
                            height: `${handleWidth}px`,
                            transform: `translate(${bounds.x - handleWidth / 2}px, ${bounds.y + bounds.height - handleWidth / 2}px)`,
                        }}
                        className="fill-white stroke-[#0b99ff] stroke-[1px]"
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizeHandlePointerDown(Corner.BottomLeft, bounds as XYWH);
                        }}
                    />
                    {/* Bottom handle */}
                    <rect
                        style={{
                            cursor: "ns-resize",
                            width: `${handleWidth}px`,
                            height: `${handleWidth}px`,
                            transform: `translate(${bounds.x + bounds.width / 2 - handleWidth / 2}px, ${bounds.y + bounds.height - handleWidth / 2}px)`,
                        }}
                        className="fill-white stroke-[#0b99ff] stroke-[1px]"
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizeHandlePointerDown(Side.Bottom, bounds as XYWH);
                        }}
                    />
                    {/* Bottom-right handle */}
                    <rect
                        style={{
                            cursor: "nwse-resize",
                            width: `${handleWidth}px`,
                            height: `${handleWidth}px`,
                            transform: `translate(${bounds.x + bounds.width - handleWidth / 2}px, ${bounds.y + bounds.height - handleWidth / 2}px)`,
                        }}
                        className="fill-white stroke-[#0b99ff] stroke-[1px]"
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizeHandlePointerDown(Corner.BottomRight, bounds as XYWH);
                        }}
                    />
                </>
            )}
        </>
    );
});

SelectionBox.displayName = "SelectionBox";

export default SelectionBox;