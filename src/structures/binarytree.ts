export class BinaryTree {

    const BINARYTREE_ESCAPE_CHAR = 0xFD;
    BINARYTREE_NODE_START = 0xFE,
    BINARYTREE_NODE_END = 0xFF
    BinaryTree(const FileStreamPtr& fin);
~BinaryTree();

    void seek(uint pos);
    void skip(uint len);
    uint tell() { return m_pos; }
    uint size() { unserialize(); return m_buffer.size(); }

    uint8 getU8();
    uint16 getU16();
    uint32 getU32();
    uint64 getU64();
    std::string getString(uint16 len = 0);
    Point getPoint();

    BinaryTreeVec getChildren();
    bool canRead() { unserialize(); return m_pos < m_buffer.size(); }

    private:
        void unserialize();
    void skipNodes();

    FileStreamPtr m_fin;
    DataBuffer<uint8> m_buffer;
    uint m_pos;
    uint m_startPos;
}
