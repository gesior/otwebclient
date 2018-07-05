export class Color {
    public static readonly alpha      = 0x00000000;
    public static readonly white      = 0xffffffff;
    public static readonly black      = 0xff000000;
    public static readonly red        = 0xff0000ff;
    public static readonly darkRed    = 0xff000080;
    public static readonly green      = 0xff00ff00;
    public static readonly darkGreen  = 0xff008000;
    public static readonly blue       = 0xffff0000;
    public static readonly darkBlue   = 0xff800000;
    public static readonly pink       = 0xffff00ff;
    public static readonly darkPink   = 0xff800080;
    public static readonly yellow     = 0xff00ffff;
    public static readonly darkYellow = 0xff008080;
    public static readonly teal       = 0xffffff00;
    public static readonly darkTeal   = 0xff808000;
    public static readonly gray       = 0xffa0a0a0;
    public static readonly darkGray   = 0xff808080;
    public static readonly lightGray  = 0xffc0c0c0;
    public static readonly orange     = 0xff008cff;

    static from8bit(arg0: any): any {
        throw new Error("Method not implemented.");
    }
}
